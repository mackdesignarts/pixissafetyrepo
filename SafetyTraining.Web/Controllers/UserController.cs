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
using SafetyTraining.Web.ActionFilters;
using System.Web.Security;
using System.Web.Http.OData;

namespace SafetyTraining.Web.Controllers
{
    public class UserController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/User
        public IQueryable<User> GetUser()
        {
            return db.Users;
        }

        // GET odata/User(5)
        public SingleResult<User> GetUser(int key)
        {
            return SingleResult.Create(db.Users.Where(user => user.UserID == key));
        }

        // PUT odata/User(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Put(int key, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != user.UserID)
            {
                return BadRequest();
            }
            if (!String.IsNullOrEmpty(user.Password))
            {
                user.Password = FormsAuthentication.HashPasswordForStoringInConfigFile(user.Password, "SHA1");
            }
            db.Entry(user).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(user);
        }

        // POST odata/User
        [NotHas("ReadOnly")]
        public IHttpActionResult Post(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            user.Password = FormsAuthentication.HashPasswordForStoringInConfigFile(user.Password, "SHA1");
            db.Users.Add(user);
            db.SaveChanges();

            return Ok(user);
        }

        // PATCH odata/User(5)
        [AcceptVerbs("PATCH", "MERGE")]
        [NotHas("ReadOnly")]
        public IHttpActionResult Patch(int key, Delta<User> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User user = db.Users.Find(key);
            if (user == null)
            {
                return NotFound();
            }
            var obj = new object();

            patch.TryGetPropertyValue("Password", out obj);
            if (!String.IsNullOrEmpty((string)obj))
            {
                patch.TrySetPropertyValue("Password", (object)FormsAuthentication.HashPasswordForStoringInConfigFile((string)obj, "SHA1"));
            }

            patch.Patch(user);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(user);
        }

        // DELETE odata/User(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            User user = db.Users.Find(key);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();

            }
            base.Dispose(disposing);
        }

        private bool UserExists(int key)
        {
            return db.Users.Count(e => e.UserID == key) > 0;
        }
    }
}