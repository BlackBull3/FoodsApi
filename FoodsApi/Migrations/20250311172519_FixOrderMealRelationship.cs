using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodsApi.Migrations
{
    /// <inheritdoc />
    public partial class FixOrderMealRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealIngredientMapping_MealIngredients_IngredientsId",
                table: "MealIngredientMapping");

            migrationBuilder.DropForeignKey(
                name: "FK_MealIngredientMapping_Meals_MealsId",
                table: "MealIngredientMapping");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Meals_MealId1",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_MealId1",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MealIngredientMapping",
                table: "MealIngredientMapping");

            migrationBuilder.DropColumn(
                name: "MealId1",
                table: "Orders");

            migrationBuilder.RenameTable(
                name: "MealIngredientMapping",
                newName: "MealIngredientMeals");

            migrationBuilder.RenameIndex(
                name: "IX_MealIngredientMapping_MealsId",
                table: "MealIngredientMeals",
                newName: "IX_MealIngredientMeals_MealsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MealIngredientMeals",
                table: "MealIngredientMeals",
                columns: new[] { "IngredientsId", "MealsId" });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VerificationCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsVerified = table.Column<bool>(type: "bit", nullable: false),
                    ResetPasswordCode = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_MealIngredientMeals_MealIngredients_IngredientsId",
                table: "MealIngredientMeals",
                column: "IngredientsId",
                principalTable: "MealIngredients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MealIngredientMeals_Meals_MealsId",
                table: "MealIngredientMeals",
                column: "MealsId",
                principalTable: "Meals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealIngredientMeals_MealIngredients_IngredientsId",
                table: "MealIngredientMeals");

            migrationBuilder.DropForeignKey(
                name: "FK_MealIngredientMeals_Meals_MealsId",
                table: "MealIngredientMeals");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MealIngredientMeals",
                table: "MealIngredientMeals");

            migrationBuilder.RenameTable(
                name: "MealIngredientMeals",
                newName: "MealIngredientMapping");

            migrationBuilder.RenameIndex(
                name: "IX_MealIngredientMeals_MealsId",
                table: "MealIngredientMapping",
                newName: "IX_MealIngredientMapping_MealsId");

            migrationBuilder.AddColumn<int>(
                name: "MealId1",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MealIngredientMapping",
                table: "MealIngredientMapping",
                columns: new[] { "IngredientsId", "MealsId" });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_MealId1",
                table: "Orders",
                column: "MealId1");

            migrationBuilder.AddForeignKey(
                name: "FK_MealIngredientMapping_MealIngredients_IngredientsId",
                table: "MealIngredientMapping",
                column: "IngredientsId",
                principalTable: "MealIngredients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MealIngredientMapping_Meals_MealsId",
                table: "MealIngredientMapping",
                column: "MealsId",
                principalTable: "Meals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Meals_MealId1",
                table: "Orders",
                column: "MealId1",
                principalTable: "Meals",
                principalColumn: "Id");
        }
    }
}
