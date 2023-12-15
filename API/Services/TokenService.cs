using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using Microsoft.IdentityModel.Tokens;

namespace API;

public class TokenService : ITokenService
{
    private readonly SymmetricSecurityKey _key;

    public TokenService(IConfiguration config)
    {
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
    }

    public string CreateToken(AppUser user)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
        };

        //credentials to sign the token with
        var credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

        //describe the token we are going to return
        //so how the token should look like / what it should contain
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims), //claims we want to return
            Expires = DateTime.Now.AddMinutes(30), //how long the token is valid
            SigningCredentials = credentials    //credentials to sign the token
        };

        //token handler
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        //serialize token and return it
        return tokenHandler.WriteToken(token);
    }
}
