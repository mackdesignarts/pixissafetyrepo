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
using Newtonsoft.Json.Linq;

namespace SafetyTraining.Web.Controllers
{
    public class EmployeeController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        //// GET odata/Employee
        public IHttpActionResult GetEmployees()
        {
            return Ok(db.vGetEmployees);
        }

        // GET odata/Employee/5
        public SingleResult<vGetEmployee> GetEmployee(int id)
        {
            return SingleResult.Create(db.vGetEmployees.Where(employee => employee.EmployeeID == id));
        }

        // GET api/Employee?{query_params}
        public IHttpActionResult GetEmployee(int top, string filter, string expand, string orderby, string inlinecount)
        {
            return Ok(db.vGetEmployees.Take(top));
        }

        // POST api/Employee
        public IHttpActionResult Post(Employee employee)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Employees.Add(employee);
                db.SaveChanges();

                return Ok(employee);

            }
            catch (Exception)
            {
                return BadRequest("There was an error writing to the database.");
            }

        }

        // GET odata/Employee(5)/CoursesTakens
        //public IQueryable<CoursesTaken> GetCoursesTakens(int key)
        //{
        //    return db.Employees.Where(m => m.EmployeeID == key).SelectMany(m => m.CoursesTakens);
        //}

        // GET odata/Employee(5)/Company
        //public SingleResult<TLCompany> GetCompany(int key)
        //{
        //    return SingleResult.Create(db.Employees.Where(m => m.EmployeeID == key).Select(m => m.TLCompany));
        //}

        //// GET odata/Employee(5)/dbo_PRM_MASTER__EMPLOYEE
        //public SingleResult<Employee> GetEmployeeO(int key)
        //{
        //    return SingleResult.Create<Employee>(db.Employees.Where(m => m.EmployeeID == key).Select(m => m));
        //}


        //// GET odata/Employee(5)/EmployeeStatu
        //public SingleResult<EmployeeStatu> GetEmployeeStatu(int key)
        //{
        //    return SingleResult.Create(db.Employees.Where(m => m.EmployeeID == key).Select(m => m.EmployeeStatu));
        //}

        ////GET odata/Employee(int)/EmployeeNote
        //public IQueryable<EmployeeNote> GetEmployeeNote(int key)
        //{
        //    return db.EmployeeNotes.Where(m => m.EmployeeID == key);
        //}

        // PUT odata/Employee(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Put(int key, Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != employee.EmployeeID)
            {
                return BadRequest();
            }

            db.Entry(employee).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(employee);
        }
        
        // PATCH odata/Employee(5)
        //[AcceptVerbs("PATCH", "MERGE")]
        //[NotHas("ReadOnly")]
        //public IHttpActionResult Patch(int key, Delta<Employee> patch)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    Employee employee = db.Employees.Find(key);
        //    if (employee == null)
        //    {
        //        return NotFound();
        //    }

        //    patch.Patch(employee);

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!EmployeeExists(key))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return Ok(employee);
        //}

        // DELETE odata/Employee(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Delete( int key)
        {
            Employee employee = db.Employees.Find(key);
            if (employee == null)
            {
                return NotFound();
            }

            db.Employees.Remove(employee);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }
               


        // TODO: Does not contain CrewDetails

        // GET odata/Employee(5)/CrewDetails
        //public IQueryable<CrewDetail> GetCrewDetails([FromODataUri] int key)
        //{
        //    return db.Employees.Where(m => m.EmployeeID == key).SelectMany(m => m.CrewDetails);
        //}


        protected override void Dispose(bool disposing)
        {

            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeExists(int key)
        {
            return db.Employees.Count(e => e.EmployeeID == key) > 0;
        }
    }
}