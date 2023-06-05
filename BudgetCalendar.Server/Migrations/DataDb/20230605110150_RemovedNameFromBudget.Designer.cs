﻿// <auto-generated />
using System;
using BudgetCalendar.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BudgetCalendar.Server.Migrations.DataDb
{
    [DbContext(typeof(DataDbContext))]
    [Migration("20230605110150_RemovedNameFromBudget")]
    partial class RemovedNameFromBudget
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BudgetCalendar.Server.Auth.Entities.Role", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Role");

                    b.HasData(
                        new
                        {
                            Id = "3909e3fd-ab8e-4155-8c47-a80d956da0a9",
                            Name = "Admin",
                            NormalizedName = "ADMIN"
                        },
                        new
                        {
                            Id = "175bf9d2-3988-4115-9d3c-8d88d3300ded",
                            Name = "User",
                            NormalizedName = "USER"
                        });
                });

            modelBuilder.Entity("BudgetCalendar.Server.Data.Models.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Added")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("Balance")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime?>("Deleted")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsArchived")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("Modified")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Accounts", (string)null);
                });

            modelBuilder.Entity("BudgetCalendar.Server.Data.Models.Budget", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Added")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Deleted")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsArchived")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("Modified")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("TransactionType")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Budgets", (string)null);
                });

            modelBuilder.Entity("BudgetCalendar.Server.Data.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories", (string)null);
                });

            modelBuilder.Entity("BudgetCalendar.Server.Data.Models.Budget", b =>
                {
                    b.HasOne("BudgetCalendar.Server.Data.Models.Account", "Account")
                        .WithMany("Budgets")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BudgetCalendar.Server.Data.Models.Category", "Category")
                        .WithMany("Budgets")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("BudgetCalendar.Server.Data.Models.Account", b =>
                {
                    b.Navigation("Budgets");
                });

            modelBuilder.Entity("BudgetCalendar.Server.Data.Models.Category", b =>
                {
                    b.Navigation("Budgets");
                });
#pragma warning restore 612, 618
        }
    }
}
