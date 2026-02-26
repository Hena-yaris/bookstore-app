
import {
  Box,
  Container,
  Typography,
  IconButton,
  Stack,
  Link,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language"; 
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        pt: 8,
        pb: 4,
        backgroundColor: "#1a202c",
        color: "rgba(255, 255, 255, 0.7)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "flex-start" },
            gap: 4,
            mb: 6,
          }}
        >
          {/* Brand Section */}
          <Box
            sx={{ maxWidth: "300px", textAlign: { xs: "center", md: "left" } }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
                color: "white",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <MenuBookIcon sx={{ color: "#3182ce" }} fontSize="medium" />
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, letterSpacing: "-0.5px" }}
              >
                Bookstore
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              A full-stack application demonstrating modern UI/UX practices,
              secure authentication, and seamless data management.
            </Typography>
          </Box>

          {/* Professional Links */}
          <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "white", fontWeight: "bold", mb: 2 }}
            >
              Connect with the Developer
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              justifyContent={{ xs: "center", md: "flex-end" }}
            >
              {[
                {
                  icon: <GitHubIcon />,
                  url: "https://github.com/hena-yaris",
                  label: "GitHub",
                },
                {
                  icon: <LinkedInIcon />,
                  url: "https://www.linkedin.com/in/henayaris/",
                  label: "LinkedIn",
                },
                {
                  icon: <LanguageIcon />,
                  url: "https://henayaris.netlify.app/",
                  label: "Portfolio",
                },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  color="inherit"
                  href={social.url}
                  target="_blank"
                  aria-label={social.label}
                  sx={{
                    transition: "all 0.2s",
                    "&:hover": {
                      color: "#3182ce",
                      transform: "translateY(-4px)",
                      backgroundColor: "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Bottom Bar */}
        <Box
          sx={{
            pt: 4,
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ letterSpacing: "0.5px" }}>
            © {new Date().getFullYear()} HENOK. • Built with React & Material
            UI
          </Typography>

          <Stack direction="row" spacing={3}>
            <Typography
              variant="caption"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              Portfolio Project v1.0
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;