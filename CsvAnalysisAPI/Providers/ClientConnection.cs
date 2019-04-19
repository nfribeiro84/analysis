using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CsvAnalysisAPI.Providers
{
    public class ClientConnection
    {
        IPersistentConnectionContext connection;

        public ClientConnection()
        {
            connection = GlobalHost.ConnectionManager.GetConnectionContext<ClientConnectionProvider>();
        }
    }
}