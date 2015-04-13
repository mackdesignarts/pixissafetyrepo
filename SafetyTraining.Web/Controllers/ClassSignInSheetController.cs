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
using System.Web.Http.OData;

namespace SafetyTraining.Web.Controllers
{
    public class ClassSignInSheetController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/ClassSignInSheet
        public IQueryable<ClassSignInSheet> GetClassSignInSheet()
        {
            return db.ClassSignInSheets;
        }

        // GET odata/ClassSignInSheet(5)
        public SingleResult<ClassSignInSheet> GetClassSignInSheet(int key)
        {
            return SingleResult.Create(db.ClassSignInSheets.Where(classsigninsheet => classsigninsheet.ClassSignInSheetID == key));
        }

        // PUT odata/ClassSignInSheet(5)
        public IHttpActionResult Put(int key, ClassSignInSheet classsigninsheet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != classsigninsheet.ClassSignInSheetID)
            {
                return BadRequest();
            }

            db.Entry(classsigninsheet).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassSignInSheetExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(classsigninsheet);
        }

        // POST odata/ClassSignInSheet
        public IHttpActionResult Post(ClassSignInSheet classsigninsheet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ClassSignInSheets.Add(classsigninsheet);
            db.SaveChanges();

            return Ok(classsigninsheet);
        }
     
        // PATCH odata/ClassSignInSheet(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch(int key, Delta<ClassSignInSheet> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ClassSignInSheet classsigninsheet = db.ClassSignInSheets.Find(key);
            if (classsigninsheet == null)
            {
                return NotFound();
            }

            patch.Patch(classsigninsheet);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassSignInSheetExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(classsigninsheet);
        }

        // DELETE odata/ClassSignInSheet(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            ClassSignInSheet classsigninsheet = db.ClassSignInSheets.Find(key);
            if (classsigninsheet == null)
            {
                return NotFound();
            }

            db.ClassSignInSheets.Remove(classsigninsheet);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET odata/ClassSignInSheet(5)/Class
        public SingleResult<Class> GetClass([FromODataUri] int key)
        {
            return SingleResult.Create(db.ClassSignInSheets.Where(m => m.ClassSignInSheetID == key).Select(m => m.Class));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClassSignInSheetExists(int key)
        {
            return db.ClassSignInSheets.Count(e => e.ClassSignInSheetID == key) > 0;
        }
        
    }
}