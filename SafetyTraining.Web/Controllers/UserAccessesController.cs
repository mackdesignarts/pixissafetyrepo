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
using System.Web.Http.OData;

namespace SafetyTraining.Web.Controllers
{
    public class UserAccessesController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET: odata/UserAccesses
        public IQueryable<UserAccess> GetUserAccesses()
        {
            return db.UserAccesses;
        }

        // GET: odata/UserAccesses(5)
        public SingleResult<UserAccess> GetUserAccess(int key)
        {
            return SingleResult.Create(db.UserAccesses.Where(userAccess => userAccess.UserAccessID == key));
        }

        // PUT: odata/UserAccesses(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Put(int key, Delta<UserAccess> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserAccess userAccess = db.UserAccesses.Find(key);
            if (userAccess == null)
            {
                return NotFound();
            }

            patch.Put(userAccess);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserAccessExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(userAccess);
        }

        // POST: odata/UserAccesses
        [NotHas("ReadOnly")]
        public IHttpActionResult Post(UserAccess userAccess)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserAccesses.Add(userAccess);
            db.SaveChanges();

            return Ok(userAccess);
        }

        // PATCH: odata/UserAccesses(5)
        [AcceptVerbs("PATCH", "MERGE")]
        [NotHas("ReadOnly")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<UserAccess> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserAccess userAccess = db.UserAccesses.Find(key);
            if (userAccess == null)
            {
                return NotFound();
            }

            patch.Patch(userAccess);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserAccessExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(userAccess);
        }

        // DELETE: odata/UserAccesses(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            UserAccess userAccess = db.UserAccesses.Find(key);
            if (userAccess == null)
            {
                return NotFound();
            }

            db.UserAccesses.Remove(userAccess);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // TODO: refactor SingleResult to web API

        // GET: odata/UserAccesses(5)/UserAccessFlag1
        //public SingleResult<UserAccessFlag> GetUserAccessFlag1([FromODataUri] int key)
        //{
        //    return SingleResult.Create(db.UserAccesses.Where(m => m.UserAccessID == key).Select(m => m.UserAccessFlag1));
        //}

        //// GET: odata/UserAccesses(5)/User1
        //[Queryable]
        //public SingleResult<User> GetUser1([FromODataUri] int key)
        //{
        //    return SingleResult.Create(db.UserAccesses.Where(m => m.UserAccessID == key).Select(m => m.User1));
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserAccessExists(int key)
        {
            return db.UserAccesses.Count(e => e.UserAccessID == key) > 0;
        }
    }
}