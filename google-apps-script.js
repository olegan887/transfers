/**
 * Google Apps Script for Cyprus Airport Transfers (Serverless Stripe Workflow)
 * 
 * 📌 ИНСТРУКЦИЯ ПО НАСТРОЙКЕ / SETUP INSTRUCTIONS (РУССКИЙ & ENGLISH):
 * 
 * RU:
 * 1. Откройте вашу Google Таблицу (Google Sheet).
 * 2. Перейдите во вкладку: Расширения -> Apps Script (Extensions -> Apps Script).
 * 3. Полностью сотрите весь старый код в редакторе (Code.gs) и вставьте этот новый код.
 * 4. Убедитесь, что у вас есть следующие листы в таблице:
 *    - "Orders" (Столбцы: Timestamp, Name, Phone, Email, Pickup, Dropoff, Date, Time, Passengers, Vehicle, Price, Type, Comments)
 *    - "Leads" (Столбцы: Timestamp, Status, Name, Phone, Email, Pickup, Dropoff, Date, Time, Passengers, Vehicle, Price, Comments)
 *    - "Routes" (Столбцы: From, To, Price, Available)
 *    - "BlockedTimes" (Столбцы: Date, Time)
 * 5. ⭐️ НАСТРОЙКА STRIPE:
 *    - В левом меню Apps Script нажмите на иконку шестерёнки ⚙️ (Настройки проекта / Project Settings).
 *    - Прокрутите вниз до раздела "Свойства скрипта" (Script Properties).
 *    - Нажмите "Добавить свойство скрипта" (Add script property).
 *    - Имя свойства (Property Name): STRIPE_SECRET_KEY
 *    - Значение (Value): Вставьте ваш секретный ключ Stripe (начинается с sk_live_... или sk_test_...).
 *    - Нажмите "Сохранить свойства" (Save properties).
 * 6. Нажмите кнопку "Начать развертывание" (Deploy) -> "Новое развертывание" (New deployment).
 *    - Выберите тип: "Веб-приложение" (Web App).
 *    - Запуск от имени (Execute as): "Я" (Me).
 *    - Кто имеет доступ (Who has access): "Все" (Anyone).
 * 7. Нажмите "Развернуть" (Deploy), разрешите доступ (предоставьте гуглу права на работу со своими таблицами) и скопируйте полученный Web App URL!
 * 8. Настройте Telegram Bot: Пропишите ваши TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID ниже в коде (строки 46-47).
 * 
 * EN:
 * 1. Go to your Google Sheet -> Extensions -> Apps Script.
 * 2. Delete all existing code and paste this complete code inside the editor.
 * 3. ⭐️ CONFIGURE STRIPE KEY:
 *    - Click on the Gear icon ⚙️ (Project Settings) on the left panel.
 *    - Scroll down to "Script Properties".
 *    - Click "Add script property".
 *    - Name: STRIPE_SECRET_KEY
 *    - Value: Paste your Stripe Secret Key (starts with sk_live_... or sk_test_...).
 *    - Click "Save properties".
 * 4. Update TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID below in lines 46-47.
 * 5. Click Deploy -> New Deployment -> Select "Web App".
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 6. Authorize the application and copy your final Web App URL.
 */

const TELEGRAM_BOT_TOKEN = '8715085806:AAGOT47PlW6y_t8MMnIQzJN84zXqZ8itwTY';
const TELEGRAM_CHAT_ID = '8529666732';

/**
 * Функция первоначальной настройки таблиц.
 * Рекомендуется выбрать "setup" в выпадающем списке сверху и нажать "Выполнить".
 */
function setup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  const ordersHeaders = ['Timestamp', 'Name', 'Phone', 'Email', 'Pickup', 'Dropoff', 'Date', 'Time', 'Passengers', 'Vehicle', 'Price', 'Type', 'Comments'];
  getOrCreateSheet(spreadsheet, 'Orders', ordersHeaders);
  
  const leadsHeaders = ['Timestamp', 'Status', 'Name', 'Phone', 'Email', 'Pickup', 'Dropoff', 'Date', 'Time', 'Passengers', 'Vehicle', 'Price', 'Comments'];
  getOrCreateSheet(spreadsheet, 'Leads', leadsHeaders);
  
  const routesHeaders = ['From', 'To', 'Price', 'Available'];
  getOrCreateSheet(spreadsheet, 'Routes', routesHeaders);
  
  const blockedHeaders = ['Date', 'Time'];
  getOrCreateSheet(spreadsheet, 'BlockedTimes', blockedHeaders);
  
  Logger.log("Все листы успешно созданы и готовы к работе!");
}

// Helper function to get or create a sheet with headers
function getOrCreateSheet(spreadsheet, sheetName, headers) {
  // Защита от запуска вручную без параметров из меню Apps Script
  if (!spreadsheet) {
    spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  }
  if (!sheetName) {
    sheetName = 'Orders';
  }
  if (!headers) {
    headers = ['Timestamp', 'Name', 'Phone', 'Email', 'Pickup', 'Dropoff', 'Date', 'Time', 'Passengers', 'Vehicle', 'Price', 'Type', 'Comments'];
  }

  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Helper to convert dynamic object parameters to standard URL-encoded form for Stripe
function buildFormParam(params, prefix) {
  let parts = [];
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      let value = params[key];
      let paramKey = prefix ? prefix + '[' + key + ']' : key;
      if (typeof value === 'object' && value !== null) {
        parts = parts.concat(buildFormParam(value, paramKey));
      } else if (value !== undefined && value !== null) {
        parts.push(encodeURIComponent(paramKey) + '=' + encodeURIComponent(value));
      }
    }
  }
  return parts;
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // 1. Get Routes & Prices
    const routesSheet = sheet.getSheetByName('Routes');
    const routesData = routesSheet ? routesSheet.getDataRange().getValues() : [];
    const routes = [];
    
    if (routesData.length > 1) {
      for (let i = 1; i < routesData.length; i++) {
        routes.push({
          from: String(routesData[i][0]),
          to: String(routesData[i][1]),
          price: Number(routesData[i][2]),
          available: String(routesData[i][3]).toLowerCase() === 'true' || routesData[i][3] === true
        });
      }
    }

    // 2. Get Blocked Times
    const blockedSheet = sheet.getSheetByName('BlockedTimes') || sheet.getSheetByName('Blocked Times');
    const blockedData = blockedSheet ? blockedSheet.getDataRange().getValues() : [];
    const blocked = [];
    
    if (blockedData.length > 1) {
      for (let i = 1; i < blockedData.length; i++) {
        const dateCell = blockedData[i][0];
        const timeCell = blockedData[i][1];
        
        if (!dateCell) continue;

        blocked.push({
          date: dateCell instanceof Date ? Utilities.formatDate(dateCell, Session.getScriptTimeZone(), "yyyy-MM-dd") : String(dateCell),
          time: timeCell instanceof Date ? Utilities.formatDate(timeCell, Session.getScriptTimeZone(), "HH:mm") : (timeCell ? String(timeCell) : "")
        });
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      routes: routes,
      blocked: blocked
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    const stripeSecretKey = PropertiesService.getScriptProperties().getProperty('STRIPE_SECRET_KEY');

    // ⭐️ WEBHOOK EVENT DETECTED: Direct Stripe payment confirmation
    if (payload.type && payload.type === 'checkout.session.completed' && payload.data && payload.data.object) {
      const session = payload.data.object;
      
      if (!stripeSecretKey) {
        return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'STRIPE_SECRET_KEY property is missing' }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      // Secure verification: fetch the session directly from Stripe over TLS 
      const verifiedSessionResponse = UrlFetchApp.fetch('https://api.stripe.com/v1/checkout/sessions/' + session.id, {
        method: 'get',
        headers: { 'Authorization': 'Bearer ' + stripeSecretKey },
        muteHttpExceptions: true
      });
      
      if (verifiedSessionResponse.getResponseCode() === 200) {
        const verifiedSession = JSON.parse(verifiedSessionResponse.getContentText());
        if (verifiedSession.payment_status === 'paid') {
          recordStripeOrder(spreadsheet, verifiedSession);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ⭐️ ACTION: Record Stripe Order (Explicitly matched with deduplication)
    if (payload.action === 'record_stripe_order') {
      const session = payload.session;
      if (session) {
        const recorded = recordStripeOrder(spreadsheet, session);
        return ContentService.createTextOutput(JSON.stringify({ result: 'success', recorded: recorded }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // ⭐️ ACTION: Create Stripe Checkout Session
    if (payload.action === 'create_stripe_session') {
      if (!stripeSecretKey) {
        return ContentService.createTextOutput(JSON.stringify({
          result: 'error',
          message: 'STRIPE_SECRET_KEY is not configured in Google Apps Script Script Properties! Please configure it in your Settings ⚙️.'
        })).setMimeType(ContentService.MimeType.JSON);
      }

      const b = payload.bookingData;
      const amount = Number(payload.price);
      const isDeposit = b.paymentMode === 'deposit';
      const chargeAmount = isDeposit ? 20 : amount;
      const originUrl = payload.originUrl || 'https://cyprus-airport-transfer.co';

      // Build Session Parameters
      const stripeParams = {
        'mode': 'payment',
        'success_url': originUrl + '/?session_id={CHECKOUT_SESSION_ID}',
        'cancel_url': originUrl + '/',
        'line_items[0][price_data][currency]': 'eur',
        'line_items[0][price_data][unit_amount]': Math.round(chargeAmount * 100),
        'line_items[0][price_data][product_data][name]': 'Transfer: ' + b.fromName + ' ➡️ ' + b.toName + ' (' + payload.vehicleName + ')',
        'line_items[0][quantity]': '1',
        
        // Metadata to recover full details on redirection or webhook
        'metadata[name]': b.name || '',
        'metadata[phone]': b.phone || '',
        'metadata[messenger]': b.messenger || '',
        'metadata[email]': b.email || '',
        'metadata[pickup]': b.fromName || '',
        'metadata[dropoff]': b.toName || '',
        'metadata[date]': b.date || '',
        'metadata[time]': b.time || '',
        'metadata[passengers]': String(b.pax) || '',
        'metadata[vehicle]': payload.vehicleName || '',
        'metadata[price]': String(payload.price) || '',
        'metadata[type]': b.isRoundTrip ? 'Round Trip (В обе стороны)' : 'One Way (В одну сторону)',
        'metadata[comments]': 'Payment Mode: ' + (isDeposit ? 'Deposit Paid €20' : 'Full Amount Paid €' + amount) + ' | Flight: ' + (b.flightNumber || 'N/A') + ' | Address: ' + (b.address || 'N/A') + (b.comment ? ' | Comment: ' + b.comment : '') + (b.isRoundTrip ? ' | RETURN: ' + b.returnDate + ' at ' + b.returnTime : '')
      };

      // Only add customer_email if a non-empty string is provided
      if (b.email && typeof b.email === 'string' && b.email.trim() !== '') {
        stripeParams['customer_email'] = b.email.trim();
      }

      const formBody = buildFormParam(stripeParams).join('&');

      const response = UrlFetchApp.fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + stripeSecretKey,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        payload: formBody,
        muteHttpExceptions: true
      });

      const resCode = response.getResponseCode();
      const resText = response.getContentText();

      if (resCode !== 200) {
        return ContentService.createTextOutput(JSON.stringify({
          result: 'error',
          message: 'Stripe Session creation failed (' + resCode + '): ' + resText
        })).setMimeType(ContentService.MimeType.JSON);
      }

      const session = JSON.parse(resText);
      return ContentService.createTextOutput(JSON.stringify({
        result: 'success',
        url: session.url
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // ⭐️ ACTION: Verify and Confirm Stripe Checkout Session (Browser redirected to success)
    if (payload.action === 'verify_stripe_session') {
      const sessionId = payload.sessionId;
      if (!sessionId) {
        return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'No sessionId provided' }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      if (!stripeSecretKey) {
        return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'STRIPE_SECRET_KEY is not configured in Apps Script properties.' }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      const response = UrlFetchApp.fetch('https://api.stripe.com/v1/checkout/sessions/' + sessionId, {
        method: 'get',
        headers: { 'Authorization': 'Bearer ' + stripeSecretKey },
        muteHttpExceptions: true
      });

      const resCode = response.getResponseCode();
      const resText = response.getContentText();

      if (resCode !== 200) {
        return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'Failed to verify session with Stripe: ' + resText }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      const session = JSON.parse(resText);
      if (session.payment_status === 'paid') {
        const recorded = recordStripeOrder(spreadsheet, session);
        return ContentService.createTextOutput(JSON.stringify({
          result: 'success',
          success: true,
          already_recorded: !recorded,
          metadata: session.metadata
        })).setMimeType(ContentService.MimeType.JSON);
      } else {
        return ContentService.createTextOutput(JSON.stringify({
          result: 'success',
          success: false,
          status: session.payment_status,
          message: 'Stripe Session is not fully paid.'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // ⭐️ ACTION: Log Lead (Abandoned user interaction / Search)
    if (payload.action === 'log_lead') {
      const leadsHeaders = ['Timestamp', 'Status', 'Name', 'Phone', 'Email', 'Pickup', 'Dropoff', 'Date', 'Time', 'Passengers', 'Vehicle', 'Price', 'Comments'];
      const leadsSheet = getOrCreateSheet(spreadsheet, 'Leads', leadsHeaders);
      
      leadsSheet.appendRow([
        new Date(),
        payload.status || 'Unknown',
        payload.name || '',
        payload.phone || '',
        payload.email || '',
        payload.pickup || '',
        payload.dropoff || '',
        payload.date || '',
        payload.time || '',
        payload.passengers || '',
        payload.vehicle || '',
        payload.price || '',
        payload.comments || ''
      ]);
      
      return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ⭐️ ACTION: Standard Cash Completed Order (Fallback)
    const ordersHeaders = ['Timestamp', 'Name', 'Phone', 'Email', 'Pickup', 'Dropoff', 'Date', 'Time', 'Passengers', 'Vehicle', 'Price', 'Type', 'Comments'];
    const ordersSheet = getOrCreateSheet(spreadsheet, 'Orders', ordersHeaders);

    ordersSheet.appendRow([
      new Date(),
      payload.name || '',
      payload.phone || '',
      payload.email || '',
      payload.pickup || '',
      payload.dropoff || '',
      payload.date || '',
      payload.time || '',
      payload.passengers || '',
      payload.vehicle || '',
      payload.price || '',
      payload.type || '',
      payload.comments || ''
    ]);

    sendTelegramNotification(payload);
    sendConfirmationEmail(payload);

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Write the Stripe confirmed orders to sheet (prevent duplication)
function recordStripeOrder(spreadsheet, session) {
  const m = session.metadata;
  const sessionId = session.id;
  
  const ordersHeaders = ['Timestamp', 'Name', 'Phone', 'Email', 'Pickup', 'Dropoff', 'Date', 'Time', 'Passengers', 'Vehicle', 'Price', 'Type', 'Comments'];
  const ordersSheet = getOrCreateSheet(spreadsheet, 'Orders', ordersHeaders);
  
  // Search unique session_id to deduplicate
  const data = ordersSheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    const commentValue = String(data[i][12] || '');
    if (commentValue.indexOf(sessionId) !== -1) {
      return false; // Already written to sheet!
    }
  }
  
  // Combine comments and append the stripe payment signature
  const completeComments = (m.comments || '') + ' | Unique Payment Ref: ' + sessionId;
  
  // Format phone with messenger (способ связи) so it records correctly!
  const displayPhone = m.messenger ? m.phone + ' (' + m.messenger + ')' : (m.phone || '');
  
  ordersSheet.appendRow([
    new Date(),
    m.name || '',
    displayPhone,
    m.email || '',
    m.pickup || '',
    m.dropoff || '',
    m.date || '',
    m.time || '',
    m.passengers || '',
    m.vehicle || '',
    m.price || '',
    m.type || '',
    completeComments
  ]);
  
  // Telegram payload
  const telegramPayload = {
    name: m.name,
    phone: displayPhone,
    pickup: m.pickup,
    dropoff: m.dropoff,
    date: m.date,
    time: m.time,
    vehicle: m.vehicle,
    passengers: m.passengers,
    type: m.type,
    price: m.price,
    comments: '🔔 *Payment status: PAID (ОПЛАЧЕНО) через Stripe!* \n' + completeComments
  };
  
  sendTelegramNotification(telegramPayload);

  // Send email confirmation
  sendConfirmationEmail({
    name: m.name,
    email: m.email,
    pickup: m.pickup,
    dropoff: m.dropoff,
    date: m.date,
    time: m.time,
    vehicle: m.vehicle,
    passengers: m.passengers,
    type: m.type,
    price: m.price,
    comments: completeComments
  });

  return true;
}

function sendTelegramNotification(payload) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || TELEGRAM_BOT_TOKEN === 'YOUR_TELEGRAM_BOT_TOKEN') return;

  const message = `
🚖 *New Transfer Order!*
*Name:* ${payload.name}
*Phone:* ${payload.phone}
*Route:* ${payload.pickup} ➡️ ${payload.dropoff}
*Date & Time:* ${payload.date} at ${payload.time}
*Vehicle:* ${payload.vehicle} (${payload.passengers} pax)
*Type:* ${payload.type}
*Price:* €${payload.price}

*Comments/Details:*
${payload.comments}
  `;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    })
  };

  try {
    UrlFetchApp.fetch(url, options);
  } catch (e) {
    console.error("Telegram Error: " + e.toString());
  }
}

/**
 * Sends a highly professional English confirmation email to the client with WhatsApp contact link
 */
function sendConfirmationEmail(payload) {
  const email = payload.email || '';
  if (!email || email.indexOf('@') === -1) {
    console.log("Skipping email sending: empty or invalid email address.");
    return; // No valid email address provided
  }

  const subject = "Transfer Booking Confirmed - Cyprus Airport Transfers";
  const whatsappUrl = "https://wa.me/35796867289";
  
  const textBody = "Dear " + (payload.name || 'Customer') + ",\n\n" +
    "Thank you for booking your transfer with us! We are pleased to confirm your booking.\n\n" +
    "--- BOOKING DETAILS ---\n" +
    "Route: " + payload.pickup + " ➡️ " + payload.dropoff + "\n" +
    "Date & Time: " + payload.date + " at " + payload.time + "\n" +
    "Vehicle: " + payload.vehicle + " (" + payload.passengers + " pax)\n" +
    "Price: €" + payload.price + "\n" +
    "Type: " + (payload.type || 'One Way') + "\n" +
    "Details/Comments: " + (payload.comments || 'None') + "\n\n" +
    "--- WHAT HAPPENS NEXT ---\n" +
    "1. Our driver will meet you at the arrival hall/exit area holding a sign with your name.\n" +
    "2. If your flight is delayed, don't worry! We track your flight status and the driver will wait for you free of charge.\n\n" +
    "If you have any questions, need to make changes, or wish to contact us instantly, please click the link below to chat with us on WhatsApp:\n" +
    whatsappUrl + "\n\n" +
    "Safe travels,\n" +
    "Cyprus Airport Transfers Team\n" +
    "WhatsApp Support: " + whatsappUrl;

  const htmlBody = 
    '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">' +
      '<div style="background-color: #facc15; padding: 24px; text-align: center; border-bottom: 4px solid #000000;">' +
        '<h1 style="margin: 0; font-size: 24px; font-weight: 900; color: #000000; text-transform: uppercase; letter-spacing: -0.5px;">Booking Confirmed</h1>' +
      '</div>' +
      '<div style="padding: 24px; background-color: #ffffff; color: #333333; line-height: 1.6;">' +
        '<p style="margin-top: 0; font-size: 16px;">Dear <strong>' + (payload.name || 'Customer') + '</strong>,</p>' +
        '<p style="font-size: 15px;">Thank you for booking your transfer with us! We are pleased to confirm your transfer request.</p>' +
        
        '<div style="background-color: #f9fafb; border: 2px solid #000000; padding: 16px; margin: 20px 0; border-radius: 4px; box-shadow: 4px 4px 0px 0px #000000;">' +
          '<h3 style="margin-top: 0; color: #000000; text-transform: uppercase; border-bottom: 2px solid #000000; padding-bottom: 8px; font-size: 14px; font-weight: 800;">Transfer Details</h3>' +
          '<table style="width: 100%; border-collapse: collapse; font-size: 14px;">' +
            '<tr>' +
              '<td style="padding: 6px 0; font-weight: bold; width: 120px;">Route:</td>' +
              '<td style="padding: 6px 0;">' + payload.pickup + ' &rarr; ' + payload.dropoff + '</td>' +
            '</tr>' +
            '<tr>' +
              '<td style="padding: 6px 0; font-weight: bold;">Date &amp; Time:</td>' +
              '<td style="padding: 6px 0;">' + payload.date + ' at ' + payload.time + '</td>' +
            '</tr>' +
            '<tr>' +
              '<td style="padding: 6px 0; font-weight: bold;">Vehicle:</td>' +
              '<td style="padding: 6px 0;">' + payload.vehicle + ' (' + payload.passengers + ' pax)</td>' +
            '</tr>' +
            '<tr>' +
              '<td style="padding: 6px 0; font-weight: bold;">Type:</td>' +
              '<td style="padding: 6px 0;">' + (payload.type || 'One Way') + '</td>' +
            '</tr>' +
            '<tr>' +
              '<td style="padding: 6px 0; font-weight: bold;">Price:</td>' +
              '<td style="padding: 6px 0; font-weight: 900; font-size: 16px; color: #000000;">&euro;' + payload.price + '</td>' +
            '</tr>' +
            (payload.comments ? 
            '<tr>' +
              '<td style="padding: 6px 0; font-weight: bold; vertical-align: top;">Notes:</td>' +
              '<td style="padding: 6px 0; color: #555555; font-style: italic;">' + payload.comments + '</td>' +
            '</tr>' : '') +
          '</table>' +
        '</div>' +
        
        '<h3 style="color: #000000; text-transform: uppercase; font-size: 14px; font-weight: 800; margin-top: 24px;">What Happens Next?</h3>' +
        '<ol style="padding-left: 20px; margin-bottom: 24px; font-size: 14px;">' +
          '<li style="margin-bottom: 8px;"><strong>Airport Meeting:</strong> Our professional driver will meet you directly in the arrival hall/exit area holding a prominent sign with your name.</li>' +
          '<li style="margin-bottom: 8px;"><strong>Flight Status Tracking:</strong> We track flight arrivals in real-time. If your flight is delayed, don\'t worry — we will adjust the pickup time and wait for you free of charge.</li>' +
        '</ol>' +
        
        '<div style="text-align: center; margin: 32px 0 16px 0;">' +
          '<a href="' + whatsappUrl + '" target="_blank" style="background-color: #25D366; color: #ffffff; text-decoration: none; padding: 14px 28px; font-weight: bold; font-size: 16px; border-radius: 4px; display: inline-block; border: 2px solid #000000; box-shadow: 4px 4px 0px 0px #000000; text-transform: uppercase;">' +
            '💬 Chat with us on WhatsApp' +
          '</a>' +
        '</div>' +
        '<p style="text-align: center; margin: 0; font-size: 12px; color: #666666;">' +
          'Quick help: <a href="' + whatsappUrl + '" style="color: #25D366; font-weight: bold; text-decoration: underline;">' + whatsappUrl + '</a>' +
        '</p>' +
      '</div>' +
      '<div style="background-color: #f3f4f6; padding: 16px; text-align: center; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666666;">' +
        '&copy; ' + new Date().getFullYear() + ' Cyprus Airport Transfers. All rights reserved.' +
      '</div>' +
    '</div>';

  try {
    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: textBody,
      htmlBody: htmlBody
    });
    console.log("Confirmation email successfully sent to: " + email);
  } catch (e) {
    console.error("Error sending confirmation email: " + e.toString());
  }
}
