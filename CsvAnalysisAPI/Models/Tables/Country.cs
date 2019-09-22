using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CsvAnalysisAPI.Models.Tables
{
    [PetaPoco.TableName("Countries")]
    [PetaPoco.PrimaryKey("CountriesId")]
    public class Country
    {
        public int CountriesId { get; set; }
        public string Name { get; set; }
        public string OriginalName { get; set; }
        public string IsoCodeA2 { get; set; }
        public string IsoCodeA3 { get; set; }
        public int Number { get; set; }
    }
}