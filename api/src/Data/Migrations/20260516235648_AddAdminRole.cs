using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.src.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "id",
                keyValue: "admin-id",
                column: "concurrency_stamp",
                value: "b7a699cb-80df-432f-b340-d2052a608de5");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "id",
                keyValue: "admin-id",
                column: "concurrency_stamp",
                value: "2a608de5-430a-432f-b340-d20599cb80df");
        }
    }
}
