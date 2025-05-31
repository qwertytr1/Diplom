import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import {
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  TextField,
} from '@mui/material';
import UserService from '../../services/userService';
import TrainerService from '../../services/trainerService';
import ClassService from '../../services/classesService';

interface AdminStats {
  totalUsers: number;
  totalTrainers: number;
  subscriptionsPerWeek: number;
  activeSubscriptions: number;
}
interface ClassType {
  id: number;
  name: string;
  trainer: string;
  hall: string;
  schedule: string;
  duration: number;
  maxParticipants: number;
}
interface VisitorDto {
  id_посетителя: number;
  имя: string;
  фамилия: string;
  пол: string;
  дата_рождения: string;
  телефон: string;
  email: string;
  адрес?: string;
  дата_регистрации: string;
}

interface UserSubscription {
  id: number;
  название: string;
  стоимость: number;
  длительность: string;
  включенныеУслуги: string[];
  активен: boolean;
}

interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  align: 'left' | 'right' | 'center';
  render?: (item: T) => React.ReactNode;
}
type TrainerType = {
  id_тренера: number;
  имя: string;
  фамилия: string;
  специализация: string;
  email: string;
  телефон: string;
};

interface GenericTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  keyField: keyof T;
}

const Container = styled.div`
  display: flex;
`;

const RootInner = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  color: black;
`;

const Root = styled.div`
  margin: 0 auto;
  background-color: #f5f5f5;
  color: black;
`;

const Title = styled.h2`
  padding: 1rem;
  margin: 0;
  text-align: center;
`;

const Sidebar = styled.div`
  width: 250px;
  background: white;
  border-right: 1px solid #dee2e6;
  padding: 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 0 2rem;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const AdminName = styled.p`
  font-weight: 600;
  margin: 0;
  font-size: 1.25rem;
  margin-top: 1rem;
`;

const AdminRole = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const Navigation = styled.nav`
  margin-top: 1rem;
`;

const MenuItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  color: ${(props) => (props.active ? '#ff4500' : '#212529')};
  background-color: ${(props) => (props.active ? '#f0f0f0' : 'transparent')};

  &:hover {
    background-color: #f0f0f0;
    color: #ff4500;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 1.5rem;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  h3 {
    margin-top: 0;
  }
`;

const MainContent = styled.div`
  flex: 1;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.h6`
  color: #6c757d;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.h3`
  margin-bottom: 0;
`;

// Mock data
const mockAdmin = {
  name: 'Александр Смирнов',
  role: 'Администратор',
};

const mockStats: AdminStats = {
  totalUsers: 100,
  totalTrainers: 25,
  subscriptionsPerWeek: 15,
  activeSubscriptions: 68,
};

const mockSubscriptions: UserSubscription[] = [
  {
    id: 1,
    название: 'Базовый абонемент',
    стоимость: 2500,
    длительность: '1 месяц',
    включенныеУслуги: ['Тренажерный зал', 'Групповые занятия'],
    активен: true,
  },
  {
    id: 2,
    название: 'Премиум абонемент',
    стоимость: 4500,
    длительность: '1 месяц',
    включенныеУслуги: [
      'Тренажерный зал',
      'Групповые занятия',
      'Персональный тренер',
      'Сауна',
    ],
    активен: true,
  },
  {
    id: 3,
    название: 'Студенческий',
    стоимость: 1800,
    длительность: '1 месяц',
    включенныеУслуги: ['Тренажерный зал'],
    активен: false,
  },
  {
    id: 4,
    название: 'Годовой VIP',
    стоимость: 45000,
    длительность: '12 месяцев',
    включенныеУслуги: [
      'Тренажерный зал',
      'Групповые занятия',
      'Персональный тренер',
      'Сауна',
      'Массаж',
      'Питание',
    ],
    активен: true,
  },
  {
    id: 5,
    название: 'Семейный',
    стоимость: 6000,
    длительность: '1 месяц',
    включенныеУслуги: ['Тренажерный зал', 'Групповые занятия', 'Детская зона'],
    активен: true,
  },
];

const menuItems = [
  {
    tabName: 'Cтатистика',
    id: 'statistics',
    title: 'Общая статистика',
  },
  {
    tabName: 'Пользователи',
    id: 'users',
    title: 'Управление пользователями',
  },
  {
    tabName: 'Тренеры',
    id: 'trainers',
    title: 'Управление тренерами',
  },
  {
    tabName: 'Занятия',
    id: 'sessions',
    title: 'Управление занятиями',
  },
  {
    tabName: 'Абонементы',
    id: 'subscriptions',
    title: 'Управление абонементами',
  },
  {
    tabName: 'Hастройки',
    id: 'settings',
    title: 'Настройки',
  },
];

const ContentWrapper = ({
  title,
  children = null,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <Content>
      <h3>{title}</h3>
      {children}
    </Content>
  );
};
ContentWrapper.defaultProps = {
  children: null,
};
const GenericTable = <T,>({
  data,
  columns,
  keyField,
}: GenericTableProps<T>) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="generic table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={String(column.key)} align={column.align}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={String(item[keyField])}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column, index) => (
                <TableCell
                  key={String(column.key)}
                  align={column.align}
                  component={index === 0 ? 'th' : 'td'}
                  scope={index === 0 ? 'row' : undefined}
                >
                  {column.render
                    ? column.render(item)
                    : String(item[column.key as keyof T] || '')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const AdminPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('statistics');
  const [admin] = useState(mockAdmin);
  const [stats] = useState(mockStats);
  const [users, setUsers] = useState<VisitorDto[]>([]);
  const [subscriptions] = useState(mockSubscriptions);
  const [trainers, setTrainers] = useState<TrainerType[]>([]);
  const [editingTrainer, setEditingTrainer] = useState<TrainerType | null>(
    null,
  );
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [editingClass, setEditingClass] = useState<ClassType | null>(null);
  const [classDialogOpen, setClassDialogOpen] = useState(false);
  const [isNewClass, setIsNewClass] = useState(false);

  const handleEdit = (id: number) => {
    console.log('Редактировать пользователя:', id);
  };

  useEffect(() => {
    if (activeSection === 'sessions') {
      ClassService.getAllClasses()
        .then((response) => {
          setClasses(response.data);
        })
        .catch((error) => {
          console.error('Ошибка при получении занятий:', error);
        });
    }
  }, [activeSection]);
  useEffect(() => {
    if (activeSection === 'users') {
      UserService.getAllUsers()
        .then((response) => {
          setUsers(response.data); // проверь, где именно лежит массив
        })
        .catch((error) => {
          console.error('Ошибка при получении пользователей:', error);
        });
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === 'trainers') {
      TrainerService.getAllTrainers()
        .then((response) => {
          setTrainers(response.data); // проверь, где именно в ответе лежит массив тренеров
        })
        .catch((error) => {
          console.error('Ошибка при получении тренеров:', error);
        });
    }
  }, [activeSection]);

  const handleEditTrainer = (trainer: TrainerType) => {
    setEditingTrainer({ ...trainer });
    setEditDialogOpen(true);
  };
  const handleSaveTrainer = async () => {
    if (!editingTrainer) return;
    try {
      await TrainerService.editTrainer(
        editingTrainer.id_тренера,
        editingTrainer.имя,
        editingTrainer.фамилия,
        editingTrainer.специализация,
        editingTrainer.телефон,
        editingTrainer.email,
      );
      setTrainers((prev) =>
        prev.map((t) =>
          t.id_тренера === editingTrainer.id_тренера ? editingTrainer : t,
        ),
      );
      setEditDialogOpen(false);
    } catch (err) {
      console.error('Ошибка при сохранении тренера:', err);
    }
  };

  const handleEditClass = (classItem: ClassType) => {
    setEditingClass({ ...classItem });
    setIsNewClass(false);
    setClassDialogOpen(true);
  };

  const handleAddClass = () => {
    setEditingClass({
      id: 0,
      name: '',
      trainer: '',
      hall: '',
      schedule: '',
      duration: 60,
      maxParticipants: 10,
    });
    setIsNewClass(true);
    setClassDialogOpen(true);
  };

  const handleSaveClass = async () => {
    if (!editingClass) return;
    try {
      if (isNewClass) {
        const response = await ClassService.createClass({
          name: editingClass.name,
          trainerName: editingClass.trainer,
          hallName: editingClass.hall,
          schedule: editingClass.schedule,
          duration: editingClass.duration,
          maxParticipants: editingClass.maxParticipants,
        });
        setClasses((prev) => [...prev, response.data]);
      } else {
        await ClassService.editClass(
          editingClass.id,
          editingClass.name,
          editingClass.trainer,
          editingClass.hall,
          editingClass.schedule,
          editingClass.duration,
          editingClass.maxParticipants,
        );
        setClasses((prev) =>
          prev.map((c) => (c.id === editingClass.id ? editingClass : c)),
        );
      }
      setClassDialogOpen(false);
    } catch (err) {
      console.error('Ошибка при сохранении занятия:', err);
    }
  };

  const handleDeleteClass = (id: number) => {
    ClassService.deleteClass(id)
      .then(() => {
        setClasses((prev) => prev.filter((c) => c.id !== id));
      })
      .catch((error) => {
        console.error('Ошибка при удалении занятия:', error);
      });
  };
  const handleDeleteTrainer = (id: number) => {
    TrainerService.deleteTrainer(id)
      .then(() => {
        setTrainers((prev) => prev.filter((t) => t.id_тренера !== id));
      })
      .catch((error) => {
        console.error('Ошибка при удалении тренера:', error);
      });
  };

  const handleDelete = (id: number) => {
    console.log('Удалить пользователя:', id);
  };

  const subscriptionsTableColumns: TableColumn<UserSubscription>[] = [
    {
      key: 'id',
      label: 'ID',
      align: 'left',
    },
    {
      key: 'название',
      label: 'Название',
      align: 'left',
    },
    {
      key: 'стоимость',
      label: 'Стоимость',
      align: 'right',
      render: (subscription) => `${subscription.стоимость.toLocaleString()} ₽`,
    },
    {
      key: 'длительность',
      label: 'Длительность',
      align: 'left',
    },
    {
      key: 'включенныеУслуги',
      label: 'Включенные услуги',
      align: 'left',
      render: (subscription) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {subscription.включенныеУслуги.map((service) => (
            <Chip
              key={service}
              label={service}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          ))}
        </div>
      ),
    },
    {
      key: 'активен',
      label: 'Активен',
      align: 'center',
      render: (subscription) => `${subscription.активен.toLocaleString()} ₽`,
    },
    {
      key: 'действия',
      label: 'Действия',
      align: 'center',
      // render: (subscription) => (
      //   <>
      //     <Button
      //       size="small"
      //       variant="outlined"
      //       onClick={() => {

      //       }}
      //       sx={{ mr: 1, minWidth: 'auto', px: 1 }}
      //     >
      //       ✏️
      //     </Button>
      //     <Button
      //       size="small"
      //       variant="outlined"
      //       color="error"
      //       onClick={() => handleDelete(subscription.id)}
      //       sx={{ minWidth: 'auto', px: 1 }}
      //     >
      //       🗑️
      //     </Button>
      //   </>
      // ),
    },
  ];
  const classTableColumns: TableColumn<ClassType>[] = [
    { key: 'id', label: 'ID', align: 'left' },
    { key: 'name', label: 'Название', align: 'left' },
    { key: 'trainer', label: 'Тренер', align: 'left' },
    { key: 'hall', label: 'Зал', align: 'left' },
    { key: 'schedule', label: 'Расписание', align: 'left' },
    { key: 'duration', label: 'Длительность (мин)', align: 'right' },
    { key: 'maxParticipants', label: 'Макс. участников', align: 'right' },
    {
      key: 'actions',
      label: 'Действия',
      align: 'center',
      render: (classItem) => (
        <>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleEditClass(classItem)}
            sx={{ mr: 1, minWidth: 'auto', px: 1 }}
          >
            ✏️
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleDeleteClass(classItem.id)}
            sx={{ minWidth: 'auto', px: 1 }}
          >
            🗑️
          </Button>
        </>
      ),
    },
  ];
  const trainerTableColumns: TableColumn<TrainerType>[] = [
    { key: 'id_тренера', label: 'ID', align: 'left' },
    { key: 'имя', label: 'Имя', align: 'left' },
    { key: 'фамилия', label: 'Фамилия', align: 'left' },
    { key: 'специализация', label: 'Специализация', align: 'left' },
    { key: 'email', label: 'Email', align: 'left' },
    { key: 'телефон', label: 'Телефон', align: 'left' },
    {
      key: 'actions',
      label: 'Действия',
      align: 'center',
      render: (trainer) => (
        <>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleEditTrainer(trainer)}
            sx={{ mr: 1, minWidth: 'auto', px: 1 }}
          >
            ✏️
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleDeleteTrainer(trainer.id_тренера)}
            sx={{ minWidth: 'auto', px: 1 }}
          >
            🗑️
          </Button>
        </>
      ),
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'statistics':
        return (
          <div>
            <ContentWrapper
              title={
                menuItems.find((item) => item.id === activeSection)?.title || ''
              }
            >
              <div>
                <StatsGrid>
                  <StatCard>
                    <StatValue>{stats.totalUsers}</StatValue>
                    <StatTitle>Активных пользователей</StatTitle>
                  </StatCard>
                  <StatCard>
                    <StatValue>{stats.totalTrainers}</StatValue>
                    <StatTitle>Тренеров</StatTitle>
                  </StatCard>
                  <StatCard>
                    <StatValue>{stats.subscriptionsPerWeek}</StatValue>
                    <StatTitle>Занятий в неделю</StatTitle>
                  </StatCard>
                  <StatCard>
                    <StatValue>{stats.activeSubscriptions}</StatValue>
                    <StatTitle>Активных абонементов</StatTitle>
                  </StatCard>
                </StatsGrid>
              </div>
            </ContentWrapper>
            <ContentWrapper title="Посещаемость за месяц">
              <div />
            </ContentWrapper>
            <ContentWrapper title="Популярные занятия">
              <div />
            </ContentWrapper>
          </div>
        );
      case 'subscriptions':
        return (
          <ContentWrapper
            title={
              menuItems.find((item) => item.id === activeSection)?.title || ''
            }
          >
            <GenericTable
              data={subscriptions}
              columns={subscriptionsTableColumns}
              keyField="id"
            />
          </ContentWrapper>
        );
      case 'users':
        return (
          <ContentWrapper
            title={
              menuItems.find((item) => item.id === activeSection)?.title || ''
            }
          >
            <GenericTable
              data={users}
              columns={[
                { key: 'id', label: 'ID', align: 'left' },
                { key: 'имя', label: 'Имя', align: 'left' },
                { key: 'фамилия', label: 'Фамилия', align: 'left' },
                { key: 'email', label: 'Email', align: 'left' },
                {
                  key: 'actions',
                  label: 'Действия',
                  align: 'center',
                  render: (user) => (
                    <>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEdit(user.id_посетителя)}
                        sx={{ mr: 1, minWidth: 'auto', px: 1 }}
                      >
                        ✏️
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(user.id_посетителя)}
                        sx={{ minWidth: 'auto', px: 1 }}
                      >
                        🗑️
                      </Button>
                    </>
                  ),
                },
              ]}
              keyField="id_посетителя"
            />
          </ContentWrapper>
        );
      case 'trainers':
        return (
          <ContentWrapper
            title={
              menuItems.find((item) => item.id === activeSection)?.title || ''
            }
          >
            <GenericTable
              data={trainers}
              columns={trainerTableColumns}
              keyField="id_тренера"
            />
            <Dialog
              open={editDialogOpen}
              onClose={() => setEditDialogOpen(false)}
              fullWidth
            >
              <DialogTitle>Редактирование тренера</DialogTitle>
              <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <TextField
                  label="Имя"
                  value={editingTrainer?.имя || ''}
                  onChange={(e) =>
                    setEditingTrainer((prev) =>
                      prev ? { ...prev, имя: e.target.value } : null,
                    )
                  }
                />
                <TextField
                  label="Фамилия"
                  value={editingTrainer?.фамилия || ''}
                  onChange={(e) =>
                    setEditingTrainer((prev) =>
                      prev ? { ...prev, фамилия: e.target.value } : null,
                    )
                  }
                />
                <TextField
                  label="Специализация"
                  value={editingTrainer?.специализация || ''}
                  onChange={(e) =>
                    setEditingTrainer((prev) =>
                      prev ? { ...prev, специализация: e.target.value } : null,
                    )
                  }
                />
                <TextField
                  label="Телефон"
                  value={editingTrainer?.телефон || ''}
                  onChange={(e) =>
                    setEditingTrainer((prev) =>
                      prev ? { ...prev, телефон: e.target.value } : null,
                    )
                  }
                />
                <TextField
                  label="Email"
                  value={editingTrainer?.email || ''}
                  onChange={(e) =>
                    setEditingTrainer((prev) =>
                      prev ? { ...prev, email: e.target.value } : null,
                    )
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditDialogOpen(false)}>Отмена</Button>
                <Button variant="contained" onClick={handleSaveTrainer}>
                  Сохранить
                </Button>
              </DialogActions>
            </Dialog>
          </ContentWrapper>
        );
      case 'sessions':
        return (
          <ContentWrapper
            title={
              menuItems.find((item) => item.id === activeSection)?.title || ''
            }
          >
            <Button variant="contained" onClick={handleAddClass} sx={{ mb: 2 }}>
              Добавить занятие
            </Button>
            <GenericTable
              data={classes}
              columns={classTableColumns}
              keyField="id"
            />
            <Dialog
              open={classDialogOpen}
              onClose={() => setClassDialogOpen(false)}
              fullWidth
            >
              <DialogTitle>
                {isNewClass ? 'Добавить занятие' : 'Редактировать занятие'}
              </DialogTitle>
              <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}
              >
                <TextField
                  label="Название"
                  value={editingClass?.name || ''}
                  onChange={(e) =>
                    setEditingClass((prev) =>
                      prev ? { ...prev, name: e.target.value } : null,
                    )
                  }
                />
                <TextField
                  label="Тренер"
                  value={editingClass?.trainer || ''}
                  onChange={(e) =>
                    setEditingClass((prev) =>
                      prev ? { ...prev, trainer: e.target.value } : null,
                    )
                  }
                />
                <TextField
                  label="Зал"
                  value={editingClass?.hall || ''}
                  onChange={(e) =>
                    setEditingClass((prev) =>
                      prev ? { ...prev, hall: e.target.value } : null,
                    )
                  }
                />
                <TextField
                  label="Расписание"
                  value={editingClass?.schedule || ''}
                  onChange={(e) =>
                    setEditingClass((prev) =>
                      prev ? { ...prev, schedule: e.target.value } : null,
                    )
                  }
                />
                <TextField
                  label="Длительность (мин)"
                  type="number"
                  value={editingClass?.duration || 0}
                  onChange={(e) =>
                    setEditingClass((prev) =>
                      prev
                        ? {
                            ...prev,
                            duration: parseInt(e.target.value, 10) || 0,
                          }
                        : null,
                    )
                  }
                />
                <TextField
                  label="Макс. участников"
                  type="number"
                  value={editingClass?.maxParticipants || 0}
                  onChange={(e) =>
                    setEditingClass((prev) =>
                      prev
                        ? {
                            ...prev,
                            maxParticipants: parseInt(e.target.value, 10) || 0,
                          }
                        : null,
                    )
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setClassDialogOpen(false)}>
                  Отмена
                </Button>
                <Button variant="contained" onClick={handleSaveClass}>
                  Сохранить
                </Button>
              </DialogActions>
            </Dialog>
          </ContentWrapper>
        );
      case 'settings':
        return (
          <ContentWrapper
            title={
              menuItems.find((item) => item.id === activeSection)?.title || ''
            }
          />
        );

      default:
        return <div>Выберите раздел</div>;
    }
  };

  return (
    <Root>
      <RootInner>
        <Title>Панель администратора</Title>
        <Container>
          <Sidebar>
            <ProfileSection>
              <Avatar sx={{ bgcolor: '#ff4500', width: 60, height: 60 }}>
                {admin.name[0]}
              </Avatar>
              <AdminName>{admin.name}</AdminName>
              <AdminRole>{admin.role}</AdminRole>
            </ProfileSection>

            <Navigation>
              {menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  active={activeSection === item.id}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.tabName}
                </MenuItem>
              ))}
            </Navigation>
          </Sidebar>

          <MainContent>{renderContent()}</MainContent>
        </Container>
      </RootInner>
    </Root>
  );
};

export default AdminPage;
