#!/usr/bin/env osascript -l JavaScript

function run(args) {
  ObjC.import("stdlib");
  let browser = $.getenv("browser");
  let chrome = Application(browser);
  let query = args[0];
  let [arg1, arg2] = query.split(",");
  let windowIndex = parseInt(arg1);
  let tabIndex = parseInt(arg2);

  chrome.windows[windowIndex].visible = true;
  chrome.windows[windowIndex].activeTabIndex = tabIndex + 1;
  let windowTitle = chrome.windows[windowIndex].title();
  chrome.windows[windowIndex].index = 1;
  chrome.activate();

  let candidateWindows = Array.prototype.filter.call(
    Application("System Events").processes[browser].windows,
    function(w) {
      return w.name().startsWith(windowTitle + ' - ');
    },
  );
  if (candidateWindows.length == 1) {
    candidateWindows[0].actions['AXRaise'].perform();
  }
}
