I will try and make as many flashcards as possible  
Download this project by clicking code and downloading the zip, extract it, locate the folder where you extracted it, hold shift and right click, and click open in terminal (or preferrably open in powershell).
Then paste this command and press enter  
```Powershell
$listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8080/'); $listener.Start(); while ($listener.IsListening) { $context = $listener.GetContext(); $reqPath = $context.Request.Url.LocalPath; if ($reqPath -eq '/') { $reqPath = '/index.html' }; $filePath = Join-Path . $reqPath; if (Test-Path $filePath -PathType Leaf) { $ext = [System.IO.Path]::GetExtension($filePath).ToLower(); $contentType = switch ($ext) { '.html' { 'text/html' } '.js' { 'application/javascript' } '.css' { 'text/css' } '.png' { 'image/png' } '.jpg' { 'image/jpeg' } default { 'application/octet-stream' } }; $context.Response.Headers.Add('Content-Type', $contentType); $bytes = [System.IO.File]::ReadAllBytes($filePath); $context.Response.ContentLength64 = $bytes.Length; $context.Response.OutputStream.Write($bytes, 0, $bytes.Length) } else { $context.Response.StatusCode = 404 }; $context.Response.OutputStream.Close() }
```  
Then navigate to 'http://localhost:8080/'
If you see Doctype html, don't panic, if it is the home page send me a message, and if it is when you try and change sets then you probably didn't use a valid name, remember it is case sensitive. Reload the page and you should be back to the first set. You can check your file explorer to find the set you want, it goes "flashcards/[text box 1]/[text box 2].txt'. If you used .txt I appreciate you, but don't worry about it, you just need the name, not the extension.  
Enjoy! :D
