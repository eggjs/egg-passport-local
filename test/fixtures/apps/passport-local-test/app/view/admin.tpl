<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>admin page</title>
</head>

<body>
  <div>
    <h2>${ctx.path}</h2>
    <hr> Logined user: ${user.provider} / ${user.username} / ${user.password}|
    <a href="/logout">Logout</a>
    <hr>
    <a href="/admin">Admin</a>
  </div>
</body>

</html>