# Welcome! :D
I will try and make as many flashcards as possible

---
## <mark style="background-color: green; color: white">New improved version:</mark>
Navigate to https://greenninja-bit.github.io/Flashcards/

---
## <mark style="background-color: red; color: white">DON'T USE THIS, USE THE NEW IMPROVED VERSION INSTEAD 👍</mark> I mean if you want to you can ig: 
Download this project by clicking code and downloading the zip, extract it, locate and enter the folder with "index.html" in it, hold shift and then right click, and click open in powershell.  
Then paste this command and press enter:  
```Powershell
$listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8080/'); $listener.Start(); while ($listener.IsListening) { $context = $listener.GetContext(); $reqPath = $context.Request.Url.LocalPath; if ($reqPath -eq '/') { $reqPath = '/index.html' }; $filePath = Join-Path $PWD.Path $reqPath; if (Test-Path $filePath -PathType Leaf) { $ext = [System.IO.Path]::GetExtension($filePath).ToLower(); $contentType = switch ($ext) { '.html' { 'text/html' } '.js' { 'application/javascript' } '.css' { 'text/css' } '.png' { 'image/png' } '.jpg' { 'image/jpeg' } default { 'application/octet-stream' } }; $context.Response.Headers.Add('Content-Type', $contentType); $bytes = [System.IO.File]::ReadAllBytes($filePath); $context.Response.ContentLength64 = $bytes.Length; $context.Response.OutputStream.Write($bytes, 0, $bytes.Length) } else { $context.Response.StatusCode = 404 }; $context.Response.OutputStream.Close() }
```  
Then go to 'http://localhost:8080/' in the browser of your choice  

---
# Enjoy! :D
