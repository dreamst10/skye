let queries = {
  newUser: "INSERT INTO users (user_name, user_lastname, user_email, user_password) VALUES ($1,$2,$3,$4)",
  getUser: "SELECT * FROM USERS WHERE user_id = $1",
  checkEmail: "SELECT * FROM users WHERE user_email = $1",
  uploadPicture:"UPDATE USERS SET user_avatar=$1 WHERE user_id=$2",
  checkEmail: "SELECT * FROM users WHERE user_email=$1",
  changePassword: "UPDATE users SET user_password=$1 WHERE user_id=$2",
  updateInfo: "UPDATE USERS SET user_username=$1,user_name=$2,user_lastname=$3,user_email=$4 WHERE user_id=$5",

//  searchJobs,
  getJobs: "SELECT * FROM job WHERE user_id = $1 ",
  addJob:  "INSERT INTO POST (user_id, job_title, job_description) VALUES ($1, $2, $3)",
  deleteJob: "DELETE FROM job WHERE job_id=$1 AND user_id=$2",

  searchUser: "SELECT user_id, user_username, user_name, user_lastname, user_avatar from users WHERE user_username LIKE $1",
  checkPost: 'SELECT user_id FROM post WHERE post_id = $1',
  newComment: "INSERT INTO COMMENTS (comment_text, user_id, post_id, comment_url) VALUES ($1,$2,$3, 'nada')",
  updateComment: 'UPDATE COMMENTS set comment_text = $1 WHERE comment_id = $2',
  getComments: 'SELECT co.comment_text, co.comment_id, us.user_name, us.user_lastname, co.user_id FROM COMMENTS co INNER JOIN POST pos ON pos.post_id = co.post_id INNER JOIN USERS us ON us.user_id = co.user_id  WHERE co.post_id = $1',
  deleteComment: "DELETE FROM COMMENTS WHERE comment_id= $1",

  getSkills: "SELECT * FROM skills",
  getUserSkills: "SELECT us.user_skills_score, sk.skills_description FROM user_skills us INNER JOIN skills sk ON us.skills_id = sk.skills_id WHERE us.user_id=$1",
  getJobSkills: "SELECT j.job_skills_score, sk.skills_description FROM job_skills j INNER JOIN skills sk ON j.skills_id = sk.skills_id WHERE j.job_id=$1",
  addUserSkill: "INSERT INTO user_skills (user_skills_score, skills_id, user_id) VALUES ($1, $2, $3)",
  deleteUserSkill: "DELETE FROM user_skills WHERE user_id=$1",
  addJobSkill: "INSERT INTO job_skills (job_skills_score, skills_id, job_id) VALUES ($1, $2, $3)",
  deleteJobSkill: "DELETE FROM job_skills WHERE job_id=$1",

  getJobApplications: "SELECT us.user_id, us.user_name, us.user_lastname, ja.job_application_id from users us INNER JOIN job_application ja ON us.user_id = ja.user_id WHERE ja.job_id=$1",
  getUserApplications: "SELECT jo.job_id, jo.job_title, ja.job_application_id from job jo INNER JOIN job_application ja ON jo.job_id = ja.job_id WHERE ja.user_id=$1",




}

module.exports = queries;