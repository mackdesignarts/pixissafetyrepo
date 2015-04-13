using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using SafetyTraining.Data;
using System.Web.Security;
using Newtonsoft.Json.Linq;

namespace SafetyTraining.Web.Controllers
{
    public class AuthController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // POST api/Auth
        public IHttpActionResult Post(User postUser)
        {
            try
            {
                // TODO: FormsAuthentication hash is deprecated
                string hashedPass = FormsAuthentication.HashPasswordForStoringInConfigFile(postUser.Password, "SHA1");
                var user = db.Users.FirstOrDefault(x => x.Email == postUser.Email && x.Password == hashedPass);

                if (user != null)
                {                    
                    JObject obj = JObject.FromObject(new
                    {
                        Success = true,
                        User = new
                        {
                            id = user.UserID,
                            email = user.Email,
                            access = "", //user.UserAccesses.Select(ua => ua.UserAccessFlag1.Flag),
                            username = user.UserName,
                            regionId = user.RegionID
                        }
                    });

                    return Ok(obj);
                }
                else
                {
                    JObject obj = JObject.FromObject(new { Success = false });
                    return Ok(obj);
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }
        }
    }
}