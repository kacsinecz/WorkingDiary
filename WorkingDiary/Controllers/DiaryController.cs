using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mime;
using System.Web;
using System.Web.Mvc;
using WorkingDiary.Models;

namespace WorkingDiary.Controllers
{
    public class DiaryController : Controller
    {
        Dictionary<string, bool> holidays;
        Dictionary<DateTime, bool> easter;

        
        [Authorize(Roles = "Administrator,Standard")]
        public ActionResult Index()
        {
            var db = new working_diaryEntities();
            ViewBag.Username = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByNameAsync(User.Identity.Name).Result.Realname;
            ViewBag.Viewname = "diary";
            ViewBag.MinYear = (from y in db.diary select y.diary_day).Min().Year;
            ViewBag.MaxYear = DateTime.Now.Year;
            ViewBag.ActualMonth = DateTime.Now.Month;
            return View();
        }

        [Authorize(Roles = "Administrator,Standard")]
        public ActionResult GetDiaryData(int year,int month)
        {
            DateTime next_date,day;
            List<Day> diarymonth = new List<Day>();
            Day day_in_db;
            
            holidays = new Dictionary<string, bool>();
            holidays.Add("01|01", true);
            holidays.Add("01|06", true);
            holidays.Add("05|01", true);
            holidays.Add("05|08", true);
            holidays.Add("07|05", true);
            holidays.Add("08|29", true);
            holidays.Add("09|01", true);
            holidays.Add("09|15", true);
            holidays.Add("11|01", true);
            holidays.Add("11|17", true);
            holidays.Add("12|24", true);
            holidays.Add("12|25", true);
            holidays.Add("12|26", true);
            easter = new Dictionary<DateTime, bool>();
            easter.Add(new DateTime(2014, 4, 18), true);
            easter.Add(new DateTime(2014, 4, 21), true);
            easter.Add(new DateTime(2015, 4, 3), true);
            easter.Add(new DateTime(2015, 4, 6), true);
            easter.Add(new DateTime(2016, 3, 25), true);
            easter.Add(new DateTime(2016, 3, 28), true);
            easter.Add(new DateTime(2017, 4, 14), true);
            easter.Add(new DateTime(2017, 4, 17), true);
            List<string> days_in_week = new List<string>{"Nedeľa","Pondelok","Utorok","Streda","Štvrtok","Piatok","Sobota"};

            if (month < 12)
            {
                next_date = new DateTime(year, month + 1, 1);
            }
            else
            {
                next_date = new DateTime(year + 1, 1, 1);
            }
            var db = new working_diaryEntities();
            var activedays = (from di in db.diary
                             from pr in db.project
                             where di.project_id == pr.project_id && di.diary_day >= new DateTime(year, month, 1) && di.diary_day < next_date
                             orderby di.diary_day, di.diary_order
                             select new { day = di.diary_day.Day, projectId = di.project_id, projectName = pr.project_name,
                                 activity = di.diary_activity, hours = di.diary_hours }).ToList();

            for (int d = 1; d <= DateTime.DaysInMonth(year, month); d++)
            {
                day_in_db = null;
                day = new DateTime(year, month, d);
                foreach (var ad in activedays)
                {
                    if (ad.day == d)
                    {
                        day_in_db = new Day(d,days_in_week[(int)day.DayOfWeek],ad.projectId,ad.projectName,ad.activity,ad.hours, IsHoliday(day));
                        diarymonth.Add(day_in_db);
                    }
                }

                if (day_in_db == null)
                {
                    diarymonth.Add(new Day(d, days_in_week[(int)day.DayOfWeek], 0, "", "", 0, IsHoliday(day)));
                }
            }
            
            return Json(diarymonth,JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles = "Administrator,Standard")]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult DiaryData(int year, int month)
        {
            DateTime next_date, day;
            List<Day> diarymonth = new List<Day>();
            Day day_in_db;
            string user_id = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByNameAsync(User.Identity.Name).Result.Id;

            holidays = new Dictionary<string, bool>();
            holidays.Add("01|01", true);
            holidays.Add("01|06", true);
            holidays.Add("05|01", true);
            holidays.Add("05|08", true);
            holidays.Add("07|05", true);
            holidays.Add("08|29", true);
            holidays.Add("09|01", true);
            holidays.Add("09|15", true);
            holidays.Add("11|01", true);
            holidays.Add("11|17", true);
            holidays.Add("12|24", true);
            holidays.Add("12|25", true);
            holidays.Add("12|26", true);
            easter = new Dictionary<DateTime, bool>();
            easter.Add(new DateTime(2014, 4, 18), true);
            easter.Add(new DateTime(2014, 4, 21), true);
            easter.Add(new DateTime(2015, 4, 3), true);
            easter.Add(new DateTime(2015, 4, 6), true);
            easter.Add(new DateTime(2016, 3, 25), true);
            easter.Add(new DateTime(2016, 3, 28), true);
            easter.Add(new DateTime(2017, 4, 14), true);
            easter.Add(new DateTime(2017, 4, 17), true);
            List<string> days_in_week = new List<string> { "Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota" };

            if (month < 12)
            {
                next_date = new DateTime(year, month + 1, 1);
            }
            else
            {
                next_date = new DateTime(year + 1, 1, 1);
            }
            var db = new working_diaryEntities();
            var activedays = (from di in db.diary
                              from pr in db.project
                              where di.project_id == pr.project_id && di.diary_day >= new DateTime(year, month, 1) && 
                              di.diary_day < next_date && di.AspNetUsers_Id == user_id
                              orderby di.diary_day, di.diary_order
                              select new
                              {
                                  day = di.diary_day.Day,
                                  projectId = di.project_id,
                                  projectName = pr.project_name,
                                  activity = di.diary_activity,
                                  hours = di.diary_hours
                              }).ToList();

            for (int d = 1; d <= DateTime.DaysInMonth(year, month); d++)
            {
                day = new DateTime(year, month, d);
                day_in_db = new Day(d, days_in_week[(int)day.DayOfWeek], IsHoliday(day));
                diarymonth.Add(day_in_db);

                foreach (var ad in activedays)
                {
                    if (ad.day == d)
                    {
                        day_in_db.projectId.Add(ad.projectId);
                        day_in_db.projectName.Add(ad.projectName);
                        day_in_db.activity.Add(ad.activity);
                        day_in_db.hours.Add(ad.hours);
                    }
                }
            }

            ViewBag.diaryMonth = diarymonth;

            ViewBag.activeProjects = (from pr in db.project
                                      where pr.project_valid == true
                                      orderby pr.project_id
                                      select pr).ToList();
            return PartialView();
        }

        private bool IsHoliday(DateTime day)
        {
            if (day.DayOfWeek == DayOfWeek.Sunday)
            {
                return true;
            }
            else if (easter.ContainsKey(day))
            {
                return true;
            }
            else if (holidays.ContainsKey(string.Format("{0:00}|{1:00}", day.Month, day.Day)))
            {
                return true;
            }
            return false;
        }

        [HttpPost]
        [Authorize(Roles = "Administrator,Standard")]
        public ActionResult SaveDiaryData(string year, string month, string day, string order, string project_id, 
            string activity, string hours)
        {
            try
            {
                int iyear, imonth, iday, iorder, iprojekt_id;
                double dhours;
                

                int.TryParse(year, out iyear);
                int.TryParse(month, out imonth);
                int.TryParse(day, out iday);
                int.TryParse(order, out iorder);
                int.TryParse(project_id, out iprojekt_id);
                double.TryParse(hours, out dhours);
                
                var db = new working_diaryEntities();
                diary di = new diary();
                di.AspNetUsers_Id = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByNameAsync(User.Identity.Name).Result.Id;
                di.diary_day = new DateTime(iyear, imonth, iday);
                di.diary_order = iorder;
                di.project_id = iprojekt_id;
                di.diary_activity = activity;
                di.diary_hours = dhours;
                db.diary.Add(di);
                db.SaveChanges();
                Response.StatusCode = (int)HttpStatusCode.OK;
                return Json("Záznam bol úspešne zapísaný.", MediaTypeNames.Text.Plain);
            }
            catch(Exception)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json("Vyskytla sa databázová chyba.", MediaTypeNames.Text.Plain);
            }

        }


    }
}