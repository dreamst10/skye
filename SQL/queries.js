let queries = {
  newUser: "INSERT INTO users (user_name, user_lastname, user_email, user_password) VALUES ($1,$2,$3,$4)",
  getUser: "SELECT * FROM USERS WHERE user_id = $1",
  checkEmail: "SELECT * FROM users WHERE user_email = $1",
  uploadPicture:"UPDATE USERS SET user_avatar=$1 WHERE user_id=$2",
  checkEmail: "SELECT * FROM users WHERE user_email=$1",
  changePassword: "UPDATE users SET user_password=$1 WHERE user_id=$2",
  updateInfo: "UPDATE users SET user_name=$1,user_lastname=$2,user_email=$3 WHERE user_id=$4",

  searchJobs: "SELECT * FROM job WHERE job_title LIKE $1 OR job_description LIKE $1",
  getJobs: "SELECT * FROM job WHERE user_id = $1 ",
  postJob:  "INSERT INTO job (user_id, job_title, job_description) VALUES ($1, $2, $3) RETURNING job_id",
  deleteJob: "DELETE FROM job WHERE job_id=$1 AND user_id=$2",
  updateJob: "UPDATE job SET job_title=$1,job_description=$2 WHERE job_id=$3 AND user_id=$4",
  getJobInfo: "SELECT * FROM job WHERE job_id=$1",

  searchUser: "SELECT user_id, user_name, user_lastname, user_avatar from users WHERE user_name LIKE $1 OR user_lastname LIKE $1",
  checkPost: 'SELECT user_id FROM post WHERE post_id = $1',


  addSkill: "INSERT INTO skills (skills_description) VALUES ($1)",
  getSkills: "SELECT * FROM skills",
  getUserSkills: "SELECT us.user_skills_score, sk.skills_id, sk.skills_description FROM user_skills us INNER JOIN skills sk ON us.skills_id = sk.skills_id WHERE us.user_id=$1",
  getJobSkills: "SELECT j.job_skills_score, sk.skills_id, sk.skills_description FROM job_skills j INNER JOIN skills sk ON j.skills_id = sk.skills_id WHERE j.job_id=$1",
  addUserSkill: "INSERT INTO user_skills (user_skills_score, skills_id, user_id) VALUES ($1, $2, $3)",
  deleteUserSkills: "DELETE FROM user_skills WHERE user_id=$1",
  addJobSkill: "INSERT INTO job_skills (job_skills_score, skills_id, job_id) VALUES ($1, $2, $3)",
  deleteJobSkills: "DELETE FROM job_skills WHERE job_id=$1",

  getJobApplications: "SELECT us.user_id, us.user_name, us.user_lastname, ja.job_application_id from users us INNER JOIN job_application ja ON us.user_id = ja.user_id WHERE ja.job_id=$1",
  getUserApplications: "SELECT jo.job_id, jo.job_title, ja.job_application_id from job jo INNER JOIN job_application ja ON jo.job_id = ja.job_id WHERE ja.user_id=$1",
  sendApplication:"INSERT INTO job_application (job_id, user_id) VALUES ($1,$2)",
  deleteApplication:"DELETE FROM job_application WHERE job_application_id = $1 AND user_id = $2",
  checkApplication:"SELECT * FROM job_application WHERE job_id=$1 AND user_id=$2"




}

module.exports = queries;