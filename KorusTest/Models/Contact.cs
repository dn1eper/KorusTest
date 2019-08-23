using System.ComponentModel.DataAnnotations;

namespace KorusTest.Models
{
    public partial class Contact
    {
        public int ContactID { get; set; }

        [Required]
        [StringLength(25)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(25)]
        public string SurName { get; set; }

        [StringLength(25)]
        public string Patronymic { get; set; }

        public int TelephoneID { get; set; }

        [StringLength(50)]
        public string Address { get; set; }

        public virtual Telephone Telephone { get; set; }
    }
}
