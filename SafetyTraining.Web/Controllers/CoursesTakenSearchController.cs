﻿using System;
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

namespace SafetyTraining.Web.Controllers
{
    public class CoursesTakenSearchController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // TODO: CoursesTakenSearchResult table does not exist

    } 
}