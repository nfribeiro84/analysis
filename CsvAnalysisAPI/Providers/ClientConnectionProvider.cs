using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CsvAnalysisAPI.Providers
{
    public class ClientConnectionProvider : PersistentConnection
    {
        protected override Task OnConnected(IRequest request, string connectionId)
        {
            Groups.Add(connectionId, "analysis");
            return null;
        }

    }
}