using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WorkingDiary.Controllers
{
    public class HomeController : Controller
    {
        
        public ActionResult Index()
        {
            var db = new working_diaryEntities();
            ViewBag.Username = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByNameAsync(User.Identity.Name).Result.Realname; 
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}