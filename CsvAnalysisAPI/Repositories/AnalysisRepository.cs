using CsvAnalysisAPI.Models;
using CsvAnalysisAPI.Providers;
using GenericParsing;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace CsvAnalysisAPI.Repositories
{
    public class AnalysisRepository
    {
        ClientConnection socket;

        private const string filename = "BGRI2011_PT.csv";

        public AnalysisRepository()
        {
            this.socket = new ClientConnection();
        }

        public string BeginAnalysis()
        {
            System.Threading.Tasks.Task.Run(() => Init());
            return "Analysis begun";
        }

        /// <summary>
        /// inicia a análise do ficheiro
        /// </summary>
        /// <param name="file"></param>
        private void Init(CSVFile file = null)
        {
            try
            {
                if (file == null)
                    file = GetCSVFile();

                socket.SendFirstData("csv read into memory", file.Data, file.CsvFilesId);
                file.InitIntraAnalysis(socket);
                file.InitDivisoesCompare(socket);
                file.CheckMetricsRelations(socket);
                Metadata metadata = new Metadata(file, filename);
                socket.SendMetadata(metadata);
            }
            catch (Exception e)
            {
                file = null;
            }
        }

        /// <summary>
        /// lê um ficheiro csv para um objecto do tipo DataTable
        /// </summary>
        /// <returns></returns>
        private CSVFile GetCSVFile()
        {
            socket.SendMessage("starting to read csv file");
            DataTable data = new DataTable();
            string basePath = AppDomain.CurrentDomain.BaseDirectory.ToString();
            string filePath = basePath + "\\App_Data\\files\\" + filename;
            using (GenericParserAdapter parser = new GenericParserAdapter())
            {
                parser.SetDataSource(filePath);
                parser.ColumnDelimiter = ';';
                parser.FirstRowHasHeader = true;
                data = parser.GetDataTable();
            }
            return new CSVFile(data, filename);
        }
    }
}