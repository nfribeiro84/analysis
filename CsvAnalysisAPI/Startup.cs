using CsvAnalysisAPI.Providers;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: OwinStartup(typeof(CsvAnalysisAPI.Startup))]
namespace CsvAnalysisAPI
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureSignalR(app);
        }

        private void ConfigureSignalR(IAppBuilder app)
        {
            app.Map("/signalr", map =>
            {
                //map.UseCors(CorsOptions.AllowAll);

                //map.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions()
                //{
                //    Provider = new QueryStringOAuthBearerProvider()
                //});

                map.RunSignalR<ClientConnectionProvider>();
            });
        }
    }
}