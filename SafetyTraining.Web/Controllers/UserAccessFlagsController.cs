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
    public class UserAccessFlagsController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET: odata/UserAccessFlags
        public IQueryable<UserAccessFlag> GetUserAccessFlags()
        {
            return db.UserAccessFlags;
        }

        // GET: odata/UserAccessFlags(5)
        public SingleResult<UserAccessFlag> GetUserAccessFlag(int key)
        {
            return SingleResult.Create(db.UserAccessFlags.Where(userAccessFlag => userAccessFlag.FlagID == key));
        }

        // PUT: odata/UserAccessFlags(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Put(int key, Delta<UserAccessFlag> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserAccessFlag userAccessFlag = db.UserAccessFlags.Find(key);
            if (userAccessFlag == null)
            {
                return NotFound();
            }

            patch.Put(userAccessFlag);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserAccessFlagExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(userAccessFlag);
        }

        // POST: odata/UserAccessFlags
        [NotHas("ReadOnly")]
        public IHttpActionResult Post(UserAccessFlag userAccessFlag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserAccessFlags.Add(userAccessFlag);
            db.SaveChanges();

            return Ok(userAccessFlag);
        }

        // PATCH: odata/UserAccessFlags(5)
        [AcceptVerbs("PATCH", "MERGE")]
        [NotHas("ReadOnly")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<UserAccessFlag> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserAccessFlag userAccessFlag = db.UserAccessFlags.Find(key);
            if (userAccessFlag == null)
            {
                return NotFound();
            }

            patch.Patch(userAccessFlag);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserAccessFlagExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(userAccessFlag);
        }

        // DELETE: odata/UserAccessFlags(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            UserAccessFlag userAccessFlag = db.UserAccessFlags.Find(key);
            if (userAccessFlag == null)
            {
                return NotFound();
            }

            db.UserAccessFlags.Remove(userAccessFlag);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/UserAccessFlags(5)/UserAccesses
        public IQueryable<UserAccess> GetUserAccesses([FromODataUri] int key)
        {
            return db.UserAccessFlags.Where(m => m.FlagID == key).SelectMany(m => m.UserAccesses);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserAccessFlagExists(int key)
        {
            return db.UserAccessFlags.Count(e => e.FlagID == key) > 0;
        }
    }
}