using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CsvAnalysisAPI.Models.Tables
{
    [PetaPoco.TableName("Domains")]
    [PetaPoco.PrimaryKey("DomainsId")]
    public class Domain
    {
        public int DomainsId { get; set; }
        public int CountriesId { get; set; }
        public int DomainTypesId { get; set; }
        public int ClassifiersId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        [PetaPoco.ResultColumn]
        public string CountryJson { get; set; }
        [PetaPoco.ResultColumn]
        public string DomainTypeJson { get; set; }

        [PetaPoco.Ignore]
        public DomainType DomainType { get; set; }
        [PetaPoco.Ignore]
        public Country Country { get; set; }
        [PetaPoco.Ignore]
        public List<Classifier> Classifiers { get; set; }




        public void SetJson()
        {
            if (this.CountryJson != null)
            {
                this.Country = (Country)Newtonsoft.Json.JsonConvert.DeserializeObject(this.CountryJson, typeof(Country));
                this.CountryJson = null;
            }

            if (this.DomainTypeJson != null)
            {
                this.DomainType = (DomainType)Newtonsoft.Json.JsonConvert.DeserializeObject(this.DomainTypeJson, typeof(DomainType));
                this.DomainTypeJson = null;
            }

        }

        public void SetClassifiers(PetaPoco.Database db)
        {
            this.Classifiers = new List<Classifier>();
            Classifier root = GetRootClassifier(db);
            this.Classifiers.Add(root);
            GetChildClassifiers(root,db);
        }

        private Classifier GetRootClassifier(PetaPoco.Database db)
        {
            PetaPoco.Sql query = PetaPoco.Sql.Builder;
            query.Append("select * from Classifiers where ClassifiersId = @0", this.ClassifiersId);
            return db.SingleOrDefault<Classifier>(query);
        }

        private void GetChildClassifiers(Classifier parent, PetaPoco.Database db)
        {
            Classifier child = GetChildClassifierFromDB(db, parent.ClassifiersId);
            if(child != null)
            {
                this.Classifiers.Add(child);
                GetChildClassifiers(child, db);
            }
        }

        private Classifier GetChildClassifierFromDB(PetaPoco.Database db, int parentId)
        {
            PetaPoco.Sql query = PetaPoco.Sql.Builder;
            query.Append("select * from Classifiers where ParentId = @0", parentId);
            return db.SingleOrDefault<Classifier>(query);
        }
    }
}