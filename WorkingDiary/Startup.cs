using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WorkingDiary.Startup))]
namespace WorkingDiary
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
