SELECT users.username,posts.content,posts.id
from users 
INNER JOIN posts
ON users.id = posts.user_id
ORDER BY posts.id DESC