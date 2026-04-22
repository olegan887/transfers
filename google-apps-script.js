/**
 * Google Apps Script for Cyprus Airport Transfers
 * 
 * Instructions:
 * 1. Go to your Google Sheet -> Extensions -> Apps Script.
 * 2. Paste this code into Code.gs.
 * 3. Replace TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID with your actual bot credentials.
 * 4. Ensure your Google Sheet has the following tabs:
 *    - "Orders" (Columns: Timestamp, Name, Phone, Email, Pickup, Dropoff, Date, Time, Passengers, Vehicle, Price, Type, Comments)
 *    - "Routes" (Columns: From, To, Price, Available)
 *    - "BlockedTimes" (Columns: Date, Time)
 * 5. Click Deploy -> New Deployment -> Select "Web App".
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 6. Copy the Web App URL and paste it into your .env file as VITE_GOOGLE_SCRIPT_URL.
 */

const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';

// Helper function to get or create a sheet with headers
function getOrCreateSheet(spreadsheet, sheetName, headers) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // 1. Get Routes & Prices
    const routesSheet = sheet.getSheetByName('Routes');
    const routesData = routesSheet ? routesSheet.getDataRange().getValues() : [];
    const routes = [];
    
    // Assuming Routes sheet has headers: From | To | Price | Available
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
    
    // Assuming BlockedTimes sheet has headers: Date | Time
    if (blockedData.length > 1) {
      for (let i = 1; i < blockedData.length; i++) {
        const dateCell = blockedData[i][0];
        const timeCell = blockedData[i][1];
        
        // Skip completely empty rows
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
    
    // Handle Lead Logging (Abandoned Carts / Searches)
    if (payload.action === 'log_lead') {
      const leadsHeaders = ['Timestamp', 'Status', 'Name', 'Phone', 'Pickup', 'Dropoff', 'Date', 'Time', 'Passengers', 'Vehicle', 'Price', 'Comments'];
      const leadsSheet = getOrCreateSheet(spreadsheet, 'Leads', leadsHeaders);
      
      leadsSheet.appendRow([
        new Date(),
        payload.status || 'Unknown',
        payload.name || '',
        payload.phone || '',
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

    // Handle Completed Orders
    const ordersHeaders = ['Timestamp', 'Name', 'Phone', 'Email', 'Pickup', 'Dropoff', 'Date', 'Time', 'Passengers', 'Vehicle', 'Price', 'Type', 'Comments'];
    const ordersSheet = getOrCreateSheet(spreadsheet, 'Orders', ordersHeaders);

    // Append to Google Sheets
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

    // Send Telegram Notification
    sendTelegramNotification(payload);

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
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
