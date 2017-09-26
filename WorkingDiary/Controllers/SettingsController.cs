using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WorkingDiary.Controllers
{
    public class SettingsController : Controller
    {
        // GET: Settings
        [Authorize(Roles = "Administrator")]
        public ActionResult Index()
        {
            var db = new working_diaryEntities();
            ViewBag.Username = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByNameAsync(User.Identity.Name).Result.Realname;
            ViewBag.Viewname = "settings";
            return View();
        }
    }
}