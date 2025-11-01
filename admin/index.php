<!DOCTYPE html>
<html>
<head>
    <title>Money Advise Hub - Admin Panel</title>
    <style>
        body{font-family:Arial,sans-serif;margin:20px}
        .container{max-width:1200px;margin:0 auto}
        table{width:100%;border-collapse:collapse;margin:20px 0}
        th,td{border:1px solid #ddd;padding:12px;text-align:left}
        th{background:#f4f4f4}
        .btn{background:#007cba;color:white;padding:8px 16px;text-decoration:none;border-radius:4px}
        input,textarea{width:100%;padding:8px;margin:5px 0}
    </style>
</head>
<body>
    <div class="container">
        <h1>Money Advise Hub - Admin Panel</h1>

        <h2>Articles</h2>
        <table id="articlesTable">
            <thead>
                <tr><th>ID</th><th>Title</th><th>Category</th><th>Created</th></tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>

    <script>
        fetch('../api/articles.php')
            .then(response => response.json())
            .then(data => {
                const tbody = document.querySelector('#articlesTable tbody');
                data.forEach(article => {
                    tbody.innerHTML += `
                        <tr>
                            <td>${article.id}</td>
                            <td>${article.title}</td>
                            <td>${article.category}</td>
                            <td>${article.created_at}</td>
                        </tr>
                    `;
                });
            });
    </script>
</body>
</html>