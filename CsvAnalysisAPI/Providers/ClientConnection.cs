using CsvAnalysisAPI.Models;
using CsvAnalysisAPI.Models.Tables;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Data;
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

        public void SendMessage(string text)
        {
            ClientMessage message = new ClientMessage { MessageType = "m", MessageText = text };
            SendNotification(message);
        }

        public void SendMetadata(Metadata md)
        {
            ClientMessage message = new ClientMessage
            {
                MessageType = "md",
                MessageText = "Generated metada",
                metadata = md
            };
            SendNotification(message);
        }

        public void SendFirstData(string text, DataTable data, int fileId)
        {
            ClientMessage message = new ClientMessage {
                MessageType = "i",
                MessageText = text,
                NumColumns = data.Columns.Count,
                NumRows = data.Rows.Count,
                FileId = fileId
            };

            SendNotification(message);
        }

        public void SendColumn(string text, CSVColumn column)
        {
            //CSVColumn newcol = new CSVColumn(column.ColumnName, column.ColumnIndex, column.CsvFilesId);
            //newcol.CsvColumnsId = column.CsvColumnsId;
            //newcol.NullsCount = column.NullsCount;
            //newcol.AllDifferent = column.AllDifferent;
            //newcol.DifferentTypes = column.DifferentTypes;
            //newcol.DifferentNumericTypes = column.DifferentNumericTypes;
            //newcol.MetricOrDimension = column.MetricOrDimension;
            //newcol.Domains = column.Domains;
            //newcol.ColClass = column.ColClass;
            //if (column.UniqueValues.Count < 20)
            //    newcol.UniqueValues = column.UniqueValues;
            //else
            //    newcol.CountUniqueValues = column.UniqueValues.Count;
            ClientMessage message = new ClientMessage { MessageType = "lc", MessageText = text, Column = column};
            SendNotification(message);
        }

        public void SendRowGeographic(string text, List<DivisaoTerritorial>[] rows)
        {
            ClientMessage message = new ClientMessage { MessageType = "rg", MessageText = text, RowsGeographic = rows };
            SendNotification(message);
        }

        public void SendMetricsDimensions(string text, List<ColumnNode> tree)
        {
            ClientMessage message = new ClientMessage { MessageType = "tree", MessageText = text, Nodes = tree };
            SendNotification(message);
        }

        public void SendCategorias(string text, Categoria root)
        {
            ClientMessage message = new ClientMessage { MessageType = "categoria", MessageText = text, Categoria = root };
            SendNotification(message);
        }

        public void SendValuesDone(string text, int columnId)
        {
            ClientMessage message = new ClientMessage { MessageType = "vd", MessageText = text, ColumnId = columnId };
            SendNotification(message);
        }

        private void SendNotification(ClientMessage message)
        {
            try
            {
                connection.Groups.Send("analysis", message, new string[] { });
            }
            catch (Exception e)
            {
            }
        }
    }

    public class ClientMessage
    {
        public int FileId { get; set; }
        public string MessageType { get; set; }
        public string MessageText { get; set; }
        public int NumColumns { get; set; }
        public int NumRows { get; set; }
        public int ColumnId { get; set; }
        public CSVColumn Column { get; set; }
        public List<DivisaoTerritorial>[] RowsGeographic { get; set; }
        public List<ColumnNode> Nodes { get; set; }
        public Categoria Categoria { get; set; }
        public Metadata metadata { get; set; }
    }

    public class Column
    {
        public int ColIndex { get; set; }
        public string Name { get; set; }
    }
}