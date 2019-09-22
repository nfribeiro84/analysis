using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CsvAnalysisAPI.Providers
{
    public static class Util
    {
        public static PetaPoco.Database GetDatabase()
        {
            return new PetaPoco.Database("teseDB");
        }

        public static PetaPoco.Database GetKnowledgeDatabase()
        {
            return new PetaPoco.Database("kdb");
        }

        public static string GetMetricKey()
        {
            return "metric";
        }

        public static string GetDimensionKey()
        {
            return "dimension";
        }

        public static string GetUnknownKey()
        {
            return "unknown";
        }
    }
}