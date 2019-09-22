using CsvAnalysisAPI.Models.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CsvAnalysisAPI.Models
{
    public class RowDomain
    {
        public int RowIndex { get; set; }
        public Domain Domain { get; set; }
        public Classifier Classifier { get; set; }
    }
}