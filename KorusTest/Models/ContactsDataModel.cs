namespace KorusTest.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ContactsDataModel : DbContext
    {
        public ContactsDataModel()
            : base("name=ContactsDataModel")
        {
        }

        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<Telephone> Telephones { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>()
                .Property(e => e.FirstName)
                .IsUnicode(false);

            modelBuilder.Entity<Contact>()
                .Property(e => e.SurName)
                .IsUnicode(false);

            modelBuilder.Entity<Contact>()
                .Property(e => e.Patronymic)
                .IsUnicode(false);

            modelBuilder.Entity<Contact>()
                .Property(e => e.Address)
                .IsUnicode(false);

            modelBuilder.Entity<Telephone>()
                .Property(e => e.Number)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Telephone>()
                .HasMany(e => e.Contacts)
                .WithRequired(e => e.Telephone)
                .WillCascadeOnDelete(false);
        }
    }
}
