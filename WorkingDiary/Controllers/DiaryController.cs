﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WorkingDiary.Controllers
{
    public class DiaryController : Controller
    {
        // GET: Diary
        public ActionResult Index()
        {
            var db = new working_diaryEntities();
            ViewBag.Username = (from us in db.users select us.users_realname).FirstOrDefault();
            ViewBag.Viewname = "diary";
            ViewBag.MinYear = (from y in db.diary select y.diary_day).Min().Year;
            ViewBag.MaxYear = DateTime.Now.Year;
            ViewBag.ActualMonth = DateTime.Now.Month;
            return View();
        }
    }
}