import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserSimulationLogs, fetchUserTestLogs } from "../services/api";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Grid,
  LinearProgress,
  Avatar,
  Chip,
  Divider,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import {
  EmojiEvents,
  School,
  Psychology,
  Star,
  TrendingUp,
  Speed,
  Timeline as TimelineIcon,
  Assessment,
  WavingHand,
  Security,
  Info,
  CalendarToday,
  AccessTime,
  LocalFireDepartment,
  AutoGraph,
  RocketLaunch,
} from "@mui/icons-material";

const UserPanel = () => {
  const { user } = useContext(AuthContext);
  const [simulationLogs, setSimulationLogs] = useState([]);
  const [testLogs, setTestLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        if (user?.id) {
          const [simLogs, testLogs] = await Promise.all([
            fetchUserSimulationLogs(user.id),
            fetchUserTestLogs(user.id)
          ]);
          setSimulationLogs((simLogs || []).sort((a, b) => new Date(b.attemptedOn) - new Date(a.attemptedOn)));
          setTestLogs((testLogs || []).sort((a, b) => new Date(b.attemptedOn) - new Date(a.attemptedOn)));
        }
      } catch (err) {
        setError(`Veriler alınırken hata oluştu: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [user]);

  const calculateSuccessRate = (logs) => {
    if (logs.length === 0) return 0;
    const successful = logs.filter(log => log.isSuccessful).length;
    return Math.round((successful / logs.length) * 100);
  };

  const calculateAverageScore = (logs) => {
    if (logs.length === 0) return 0;
    const total = logs.reduce((sum, log) => sum + (log.score || 0), 0);
    return Math.round(total / logs.length);
  };

  const calculateWeeklyProgress = (logs) => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    return logs.filter(log => new Date(log.attemptedOn) > lastWeek).length;
  };

  const calculateMonthlyProgress = (logs) => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return logs.filter(log => new Date(log.attemptedOn) > lastMonth).length;
  };

  const calculateSuccessRateByCategory = (logs) => {
    const categories = {};
    logs.forEach(log => {
      if (!categories[log.category]) {
        categories[log.category] = { total: 0, successful: 0 };
      }
      categories[log.category].total++;
      if (log.isSuccessful) {
        categories[log.category].successful++;
      }
    });
    return categories;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Günaydın";
    if (hour >= 12 && hour < 18) return "İyi Günler";
    if (hour >= 18 && hour < 24) return "İyi Akşamlar";
    return "İyi Geceler";
  };

  const getStreakDays = (logs) => {
    if (logs.length === 0) return 0;
    const dates = logs.map(log => new Date(log.attemptedOn).toDateString());
    const uniqueDates = [...new Set(dates)];
    uniqueDates.sort((a, b) => new Date(b) - new Date(a));
    
    let streak = 1;
    for (let i = 1; i < uniqueDates.length; i++) {
      const current = new Date(uniqueDates[i]);
      const previous = new Date(uniqueDates[i - 1]);
      const diffDays = Math.floor((previous - current) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) streak++;
      else break;
    }
    return streak;
  };

  const getLastActivity = (logs) => {
    if (logs.length === 0) return "Henüz aktivite yok";
    const lastDate = new Date(Math.max(...logs.map(log => new Date(log.attemptedOn))));
    const now = new Date();
    const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Bugün";
    if (diffDays === 1) return "Dün";
    return `${diffDays} gün önce`;
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Siber güvenlik yolculuğunuza devam edin",
      "Her gün yeni bir şey öğrenin",
      "Güvenliğiniz bizim önceliğimiz",
      "Sürekli gelişim, sürekli başarı",
      "Siber dünyada güvende kalın",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  if (!user) {
    return (
      <Alert severity="warning" sx={{ mt: 2 }}>
        Lütfen giriş yapın.
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={styles.panelContainer}>
      <Box sx={styles.welcomeSection}>
        <Box sx={styles.welcomeContent}>
          <Box sx={styles.welcomeHeader}>
            <WavingHand sx={styles.waveIcon} />
            <Typography variant="h4" sx={styles.welcomeText}>
              {getGreeting()}, {user?.username || user?.email?.split('@')[0]}!
            </Typography>
          </Box>
          <Typography variant="subtitle1" sx={styles.welcomeSubtext}>
            {getMotivationalMessage()}
          </Typography>
        </Box>
        <Box sx={styles.welcomeStats}>
          <Box sx={styles.statBadge}>
            <LocalFireDepartment sx={styles.statIcon} />
            <Typography variant="body2" sx={styles.statText}>
              {getStreakDays([...simulationLogs, ...testLogs])} Günlük Seri
            </Typography>
          </Box>
          <Box sx={styles.statBadge}>
            <AccessTime sx={styles.statIcon} />
            <Typography variant="body2" sx={styles.statText}>
              Son Aktivite: {getLastActivity([...simulationLogs, ...testLogs])}
            </Typography>
          </Box>
          <Box sx={styles.securityBadge}>
            <Security sx={styles.securityIcon} />
            <Typography variant="body2" sx={styles.securityText}>
              Güvenli Eğitim
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={styles.headerSection}>
        <Box sx={styles.avatarContainer}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "#1E90FF",
              fontSize: "2rem",
              border: "3px solid #2a2a2a",
              boxShadow: "0 0 20px rgba(30, 144, 255, 0.3)",
              animation: "pulse 2s infinite",
            }}
          >
            {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={styles.achievementBadge}>
            <AutoGraph sx={styles.achievementIcon} />
          </Box>
        </Box>
        <Typography variant="h4" sx={styles.headerText}>
          {user?.username || user?.email?.split('@')[0]}'nin Paneli
        </Typography>
        <Box sx={styles.levelIndicator}>
          <RocketLaunch sx={styles.levelIcon} />
          <Typography variant="body2" sx={styles.levelText}>
            Seviye {Math.floor((user?.score || 0) / 100) + 1}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={styles.statCard}>
            <CardContent>
              <Box sx={styles.statIconContainer}>
                <EmojiEvents sx={styles.statIcon} />
              </Box>
              <Typography variant="h6" sx={styles.statTitle}>
                Toplam Skor
              </Typography>
              <Typography variant="h4" sx={styles.statValue}>
                {user?.score || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={styles.statCard}>
            <CardContent>
              <Box sx={styles.statIconContainer}>
                <TrendingUp sx={styles.statIcon} />
              </Box>
              <Typography variant="h6" sx={styles.statTitle}>
                Başarı Oranı
              </Typography>
              <Typography variant="h4" sx={styles.statValue}>
                {Math.round((calculateSuccessRate(simulationLogs) + calculateSuccessRate(testLogs)) / 2)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={styles.statsCard}>
            <CardContent>
              <Box sx={styles.cardHeader}>
                <Assessment sx={styles.cardIcon} />
                <Typography variant="h6" sx={styles.subHeaderText}>
                  Performans
                </Typography>
              </Box>
              <Divider sx={styles.divider} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={styles.statPaper}>
                    <Speed sx={styles.statIcon} />
                    <Typography variant="h6" sx={styles.statNumber}>
                      {calculateWeeklyProgress(testLogs)}
                    </Typography>
                    <Typography variant="body2" sx={styles.statLabel}>
                      Bu Hafta
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={styles.statPaper}>
                    <TimelineIcon sx={styles.statIcon} />
                    <Typography variant="h6" sx={styles.statNumber}>
                      {testLogs.length}
                    </Typography>
                    <Typography variant="body2" sx={styles.statLabel}>
                      Toplam
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={styles.statPaper}>
                    <TrendingUp sx={styles.statIcon} />
                    <Typography variant="h6" sx={styles.statNumber}>
                      {calculateSuccessRate(testLogs)}%
                    </Typography>
                    <Typography variant="body2" sx={styles.statLabel}>
                      Başarı Oranı
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={styles.statPaper}>
                    <CalendarToday sx={styles.statIcon} />
                    <Typography variant="h6" sx={styles.statNumber}>
                      {calculateMonthlyProgress(testLogs)}
                    </Typography>
                    <Typography variant="body2" sx={styles.statLabel}>
                      Bu Ay
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={styles.contentCard}>
            <CardContent>
              <Box sx={styles.cardHeader}>
                <Psychology sx={styles.cardIcon} />
                <Typography variant="h6" sx={styles.subHeaderText}>
                  Simülasyon Geçmişi
                </Typography>
                <Tooltip title="Tamamladığınız simülasyonların listesi">
                  <IconButton size="small" sx={styles.infoButton}>
                    <Info fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider sx={styles.divider} />
              {simulationLogs.length > 0 ? (
                <Box sx={styles.timelineContainer}>
                  <Timeline>
                    {simulationLogs.map((log) => (
                      <TimelineItem key={log.id} sx={styles.timelineItem}>
                        <TimelineSeparator>
                          <TimelineDot color={log.isSuccessful ? "success" : "error"} sx={styles.timelineDot} />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ flex: 1, width: "100%" }}>
                          <Box sx={styles.timelineContent}>
                            <Typography sx={styles.timelineTitle}>
                              {log.simulationName}
                            </Typography>
                            <Typography sx={styles.timelineDate}>
                              {new Date(log.attemptedOn).toLocaleDateString()}
                            </Typography>
                            <Chip
                              label={log.isSuccessful ? "Başarılı" : "Başarısız"}
                              color={log.isSuccessful ? "success" : "error"}
                              size="small"
                              sx={{ mt: 1 }}
                            />
                          </Box>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Box>
              ) : (
                <Typography variant="body1" sx={styles.emptyText}>
                  Henüz simülasyon geçmişiniz yok.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={styles.contentCard}>
            <CardContent>
              <Box sx={styles.cardHeader}>
                <School sx={styles.cardIcon} />
                <Typography variant="h6" sx={styles.subHeaderText}>
                  Test Geçmişi
                </Typography>
                <Tooltip title="Tamamladığınız testlerin listesi">
                  <IconButton size="small" sx={styles.infoButton}>
                    <Info fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider sx={styles.divider} />
              {testLogs.length > 0 ? (
                <Box sx={styles.timelineContainer}>
                  <Timeline>
                    {testLogs.map((log) => (
                      <TimelineItem key={log.id} sx={styles.timelineItem}>
                        <TimelineSeparator>
                          <TimelineDot color={log.isSuccessful ? "success" : "error"} sx={styles.timelineDot} />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ flex: 1, width: "100%" }}>
                          <Box sx={styles.timelineContent}>
                            <Typography sx={styles.timelineTitle}>
                              {log.testName}
                            </Typography>
                            <Typography sx={styles.timelineDate}>
                              {new Date(log.attemptedOn).toLocaleDateString()}
                            </Typography>
                            <Chip
                              label={log.isSuccessful ? "Başarılı" : "Başarısız"}
                              color={log.isSuccessful ? "success" : "error"}
                              size="small"
                              sx={{ mt: 1 }}
                            />
                          </Box>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Box>
              ) : (
                <Typography variant="body1" sx={styles.emptyText}>
                  Henüz test geçmişiniz yok.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  panelContainer: {
    padding: "20px",
    backgroundColor: "#121212",
    color: "#ffffff",
    minHeight: "100vh",
  },
  welcomeSection: {
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "linear-gradient(90deg, #1E90FF, #87CEFA, #1E90FF)",
      animation: "gradient 3s linear infinite",
    },
  },
  welcomeContent: {
    display: "flex",
    flexDirection: "column",
  },
  welcomeHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  waveIcon: {
    fontSize: "2.5rem",
    color: "#1E90FF",
    animation: "wave 2s infinite",
  },
  welcomeText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "2rem",
  },
  welcomeSubtext: {
    color: "#A0A0A0",
    marginTop: "5px",
  },
  welcomeStats: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  statBadge: {
    backgroundColor: "#2a2a2a",
    padding: "10px 20px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(30, 144, 255, 0.2)",
    },
  },
  statIcon: {
    color: "#1E90FF",
  },
  statText: {
    color: "#ffffff",
  },
  securityBadge: {
    backgroundColor: "#2a2a2a",
    padding: "10px 20px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  securityIcon: {
    color: "#1E90FF",
  },
  securityText: {
    color: "#ffffff",
  },
  headerSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mb: 4,
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-20px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "50px",
      height: "3px",
      backgroundColor: "#1E90FF",
      borderRadius: "2px",
    },
  },
  headerText: {
    color: "#1E90FF",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "10px",
  },
  "@keyframes wave": {
    "0%": { transform: "rotate(0deg)" },
    "10%": { transform: "rotate(14deg)" },
    "20%": { transform: "rotate(-8deg)" },
    "30%": { transform: "rotate(14deg)" },
    "40%": { transform: "rotate(-4deg)" },
    "50%": { transform: "rotate(10deg)" },
    "60%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(0deg)" },
  },
  statCard: {
    backgroundColor: "#1e1e1e",
    height: "100%",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  statIconContainer: {
    display: "flex",
    justifyContent: "center",
    mb: 2,
  },
  statIcon: {
    fontSize: 40,
    color: "#1E90FF",
  },
  statTitle: {
    color: "#A0A0A0",
    textAlign: "center",
    mb: 1,
  },
  statValue: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  contentCard: {
    backgroundColor: "#1e1e1e",
    height: "100%",
    minHeight: "600px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    mb: 2,
    padding: "20px",
    borderBottom: "1px solid rgba(88, 166, 255, 0.1)",
    gap: "10px",
  },
  cardIcon: {
    color: "#58a6ff",
    mr: 1,
    fontSize: "1.8rem",
    filter: "drop-shadow(0 0 5px rgba(88, 166, 255, 0.5))",
    display: "flex",
    alignItems: "center",
  },
  divider: {
    backgroundColor: "#444",
    mb: 2,
  },
  timelineContainer: {
    maxHeight: "600px",
    overflowY: "auto",
    padding: "10px",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#1e1e1e",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#444",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  },
  timelineContent: {
    backgroundColor: "#2a2a2a",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
    textAlign: "left",
    width: "100%",
  },
  timelineTitle: {
    color: "#87CEFA",
    fontWeight: "bold",
    fontSize: "1.1rem",
    marginBottom: "8px",
    textAlign: "left",
    display: "block",
  },
  timelineDate: {
    color: "#A0A0A0",
    fontSize: "0.9rem",
    marginBottom: "8px",
    textAlign: "left",
    display: "block",
  },
  timelineItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  timelineDot: {
    marginLeft: 0,
  },
  testStats: {
    display: "flex",
    gap: 1,
    marginTop: "8px",
  },
  emptyText: {
    color: "#A0A0A0",
    textAlign: "center",
    py: 4,
  },
  statsCard: {
    backgroundColor: "#1e1e1e",
    height: "100%",
  },
  statPaper: {
    backgroundColor: "#2a2a2a",
    padding: "15px",
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  statNumber: {
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  statLabel: {
    color: "#A0A0A0",
  },
  progressSection: {
    marginTop: "20px",
  },
  progressTitle: {
    color: "#ffffff",
    marginBottom: "15px",
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
  subHeaderText: {
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: "0",
    fontSize: "1.3rem",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: "20px",
  },
  achievementBadge: {
    position: "absolute",
    bottom: "-5px",
    right: "-5px",
    backgroundColor: "#2a2a2a",
    borderRadius: "50%",
    padding: "5px",
    boxShadow: "0 0 10px rgba(30, 144, 255, 0.3)",
    animation: "float 3s ease-in-out infinite",
  },
  achievementIcon: {
    color: "#1E90FF",
    fontSize: "1.5rem",
  },
  levelIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#2a2a2a",
    padding: "8px 16px",
    borderRadius: "20px",
    marginTop: "10px",
    boxShadow: "0 0 10px rgba(30, 144, 255, 0.2)",
  },
  levelIcon: {
    color: "#1E90FF",
    animation: "rocket 2s ease-in-out infinite",
  },
  levelText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  "@keyframes pulse": {
    "0%": { boxShadow: "0 0 0 0 rgba(30, 144, 255, 0.4)" },
    "70%": { boxShadow: "0 0 0 10px rgba(30, 144, 255, 0)" },
    "100%": { boxShadow: "0 0 0 0 rgba(30, 144, 255, 0)" },
  },
  "@keyframes float": {
    "0%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-5px)" },
    "100%": { transform: "translateY(0px)" },
  },
  "@keyframes rocket": {
    "0%": { transform: "rotate(-5deg)" },
    "50%": { transform: "rotate(5deg)" },
    "100%": { transform: "rotate(-5deg)" },
  },
  "@keyframes gradient": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },
  infoButton: {
    color: '#ffffff',
    display: "flex",
    alignItems: "center",
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
};

export default UserPanel;
