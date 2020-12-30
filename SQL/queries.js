const PS = require('pg-promise').PreparedStatement;
let queries = {
  newUser: new PS('new-user', "INSERT INTO users (user_name, user_lastname, user_email, user_password, user_avatar) VALUES ($1,$2,$3,$4,'./public/avatar.jpg')"),
  getUser: new PS('get-user', "SELECT * FROM USERS WHERE user_id = $1"),
  uploadPicture: new PS('new-pic', "UPDATE USERS SET user_avatar=$1 WHERE user_id=$2"),
  checkEmail: new PS('check-email',"SELECT * FROM users WHERE user_email=$1"),
  changePassword: new PS('change-pass',"UPDATE users SET user_password=$1 WHERE user_id=$2",),
  updateInfo: new PS('update-info', "UPDATE USERS SET user_username=$1,user_name=$2,user_lastname=$3,user_email=$4 WHERE user_id=$5"),

  searchJobs,
  getJobs: new PS('get-jobs',"SELECT * FROM job WHERE user_id = $1 "),
  addJob: new PS('add-job', "INSERT INTO POST (user_id, job_title, job_description) VALUES ($1, $2, $3)"),
  deleteJob: new PS('delete-job', "DELETE FROM job WHERE job_id=$1 AND user_id=$2"),

  searchUser: new PS('search', "SELECT user_id, user_username, user_name, user_lastname, user_avatar from users WHERE user_username LIKE $1"),
  checkPost: new PS('check-post', 'SELECT user_id FROM post WHERE post_id = $1'),
  newComment: new PS('new-comment', "INSERT INTO COMMENTS (comment_text, user_id, post_id, comment_url) VALUES ($1,$2,$3, 'nada')"),
  updateComment: new PS('update-comment', 'UPDATE COMMENTS set comment_text = $1 WHERE comment_id = $2'),
  getComments: new PS('get-comments', 'SELECT co.comment_text, co.comment_id, us.user_name, us.user_lastname, co.user_id FROM COMMENTS co INNER JOIN POST pos ON pos.post_id = co.post_id INNER JOIN USERS us ON us.user_id = co.user_id  WHERE co.post_id = $1'),
  deleteComment: new PS('delete-comment', "DELETE FROM COMMENTS WHERE comment_id= $1"),

  getSkills: new PS('get-skills',"SELECT * FROM skills"),
  getUserSkills: new PS('get-uSkills',"SELECT us.user_skills_score, sk.skills_description FROM user_skills us INNER JOIN skills sk ON us.skills_id = sk.skills_id WHERE us.user_id=$1"),
  getJobSkills: new PS('get-jSkills',"SELECT j.job_skills_score, sk.skills_description FROM job_skills j INNER JOIN skills sk ON j.skills_id = sk.skills_id WHERE j.job_id=$1"),
  addUserSkill: new PS('add-uSkill',"INSERT INTO user_skills (user_skills_score, skills_id, user_id) VALUES ($1, $2, $3)"),
  deleteUserSkill: new PS('del-uSkills',"DELETE FROM user_skills WHERE user_id=$1"),
  addJobSkill: new PS('add-jSkill',"INSERT INTO job_skills (job_skills_score, skills_id, job_id) VALUES ($1, $2, $3)"),
  deleteJobSkill: new PS('del-jSkills',"DELETE FROM job_skills WHERE job_id=$1"),

  getJobApplications: new PS('get-jApp', "SELECT us.user_id, us.user_name, us.user_lastname, ja.job_application_id from users us INNER JOIN job_application ja ON us.user_id = ja.user_id WHERE ja.job_id=$1"),
  getUserApplications: new PS('get-uApp', "SELECT jo.job_id, jo.job_title, ja.job_application_id from job jo INNER JOIN job_application ja ON jo.job_id = ja.job_id WHERE ja.user_id=$1"),




  
  mergeLikes: new PS('merge-likes',"SELECT COUNT(*) AS likes FROM LIKES WHERE post_id=$1 AND type_like_id=1"),
  mergeDislikes: new PS('merge-dislikes',"SELECT COUNT(*) AS dislikes FROM LIKES WHERE post_id=$1 AND type_like_id=2"),
  mergeComments: new PS('merge-comments', "SELECT COUNT(*) AS comment_quantity FROM COMMENTS WHERE post_id=$1"),

}

module.exports = queries;