const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Gifted;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0ZaZVVOY01UVHRHaXMvQVdlMlc4MElaVDROT2xsZ0o0am1wbXVHQzduYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK2hITWg2emdta25COW1WUlV0ak5rMXdDcEUwQzErY055WmVmK3ZZaUVUOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrTFY3Q3gzZy9uM001aVVibkptR25TVEgzbldnRjFWSEt6VDFvVjlUVW5vPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoSGl2WXg5NHNGblh0NXppNEpNbFBWMzJBVTVqNWp4UmU3WktIcUxTaVZnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFEOGdmT3NQNmxkbm4zajhhejM3YUJ4ZGcyYkpvTy8xL3NzTDV2SmVLVVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBWMENwQjl3a24zcll3S0ptSGMvMFNBanIvYWJSckQ1dWpCUXJINTNUbDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0hIRFpTbEhqc25vUk9YTVpyYjFkdXhLMmZwdlhLN2hlOFZPVklSdWlHQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWDF5bUlFMXpRQlc0YVFBYStEQnJJTkQvOVJiTVRNSDBFVXlwVFJKcURsQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxNdGZ2N2VhSDdaaU1HSHhhVjJ2RTBxY1dpTnE3bFJkNTVyeE1LNmNLWnM2cUVHNk9KUlBHT3g3c3pJaFNpRUNNV1pYbGZMZmxHaDBoYmlPMkdhVENRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDYsImFkdlNlY3JldEtleSI6IjJoUUpqODBKaGFmK0c3dE83Y3MxeU93cmk4M0ZlcWVvNFh5aTVlY1M2UUU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IllSZGRKaS1SUVRPanZqNkoyMFVoTWciLCJwaG9uZUlkIjoiMjI1MDFkMjYtNDg4ZC00NTQ5LTk3YmUtZjdmZGZmZGY2NWM1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik4vZUt1YWJMdVFDSE1YQitSMkIvQzBna2dLZz0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUxtbnpydzl4ek9wcHBGU0Z2dWNib0xPZDNnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmprOXJvR0VKZVAxYk1HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQ05ud2JZNXlCdVVPOFE4T1h4YlQ5V1JUMjRxM29pKzBoak5ldWJVbGtGcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiV0pvYmRRQTJYTnpJeWFHd0w4UHNvVU1JZTBOUVFDWTRmS1hrenRaL3VCUFNhdk5jV295SjJNVGNXejRjalIydFV2RWVRb01TVVBKeC91cld3S0pPQUE9PSIsImRldmljZVNpZ25hdHVyZSI6Ik81TzVLTWN4dVBjRUlpWVJSdFBJbmhhaGlNaFVWVVdvazBPS0JTQlhWanNYOHdiTFFsTUg1aXVCZzN0N3NxNHpaMHBmMEw2bk5kRmlTbkhHVytyWkNRPT0ifSwibWUiOnsiaWQiOiI5MjMyNzQ0NTQ5Mjk6MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJab3lhIEZhdGltYSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMyNzQ0NTQ5Mjk6MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRalo4RzJPY2dibER2RVBEbDhXMC9Wa1U5dUt0Nkl2dElZelhybTFKWkJiIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE4OTYyMDc0fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Gifted Tech",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254762016957,254728782591", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'ɢɪғᴛᴇᴅ-ᴍᴅ',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/a202f454c9532c3f5b7f8.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    PRESENCE : process.env.PRESENCE || 'online',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

