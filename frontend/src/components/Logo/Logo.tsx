import { SxProps, Theme, Typography } from "@mui/material";

const typographyStyles: SxProps<Theme> = {
  position: "absolute",
  top: "27px",
  height: "50px",
  width: "376px",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "41px",
  lineHeight: "44px",
  textAlign: "center",
  fontFamily: "Fredoka One",
  textShadow: "1px solid #000000",
};

const Logo = () => {
  return (
    <div>
      <Typography sx={typographyStyles}>MapMyJourney</Typography>
      <img
        src={require("./LogoImage.png")}
        style={{
          width: "45px",
          position: "absolute",
          top: "37px",
          right: "66px",
        }}
      />
    </div>
  );
};

export default Logo;
