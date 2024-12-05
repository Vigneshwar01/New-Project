import React, { useState } from 'react';
import { Button, Modal, Input, Card, Space, message, Tag, Switch ,Breadcrumb} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, BulbOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote, updateNote } from '../Redux/notesslice';
import styled from 'styled-components';
import CustomLayout from '../Components/CustomLayout'; 
import { logout } from '../Redux/authslice'; 
import { useNavigate } from 'react-router-dom';

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`;

const NoteCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: ${(props) => props.bgColor || '#1890ff'};
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const [editNote, setEditNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddNote = () => {
    if (!noteTitle || !noteDescription) {
      message.error('Both title and description are required');
      return;
    }

    const newNote = {
      id: Date.now(),
      title: noteTitle,
      description: noteDescription,
      isSticky: false,
    };

    dispatch(addNote(newNote));
    setNoteTitle('');
    setNoteDescription('');
    setIsModalVisible(false);
    message.success('Note added successfully');
  };

  const handleEditNote = (note) => {
    setEditNote(note);
    setNoteTitle(note.title);
    setNoteDescription(note.description);
    setIsModalVisible(true);
  };

  const handleUpdateNote = () => {
    if (!noteTitle || !noteDescription) {
      message.error('Both title and description are required');
      return;
    }

    dispatch(updateNote({
      id: editNote.id,
      title: noteTitle,
      description: noteDescription,
    }));

    setNoteTitle('');
    setNoteDescription('');
    setEditNote(null);
    setIsModalVisible(false);
    message.success('Note updated successfully');
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
    message.success('Note deleted successfully');
  };

 

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardColors = ['#FF7F50', '#8A2BE2', '#32CD32', '#FF6347', '#FFD700'];

  return (
    <CustomLayout user={user} handleLogout={() => dispatch(logout())}>
      <div style={{ padding: '20px', backgroundColor:  '#f4f7fc', color: '#000' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Notes</Breadcrumb.Item>
      </Breadcrumb>
        <SearchWrapper>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search notes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '300px', marginRight: '20px' }}
          />
          <Button
            type="primary"
            onClick={() => setIsModalVisible(true)}
            icon={<PlusOutlined />}
            style={{ transition: 'all 0.3s ease' }}
          >
            Add Note
          </Button>
          
        </SearchWrapper>

        <Modal
          title={editNote ? 'Edit Note' : 'Add Note'}
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setNoteTitle('');
            setNoteDescription('');
            setEditNote(null);
          }}
          onOk={editNote ? handleUpdateNote : handleAddNote}
        >
          <Input
            placeholder="Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <Input.TextArea
            placeholder="Description"
            value={noteDescription}
            onChange={(e) => setNoteDescription(e.target.value)}
            rows={4}
            style={{ marginTop: '10px' }}
          />
        </Modal>

        <CardWrapper>
          {filteredNotes.map((note, index) => (
            <NoteCard
              key={note.id}
              title={<CardTitle>{note.title}</CardTitle>}
              bgColor={cardColors[index % cardColors.length]}
              extra={
                <Space>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEditNote(note)}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteNote(note.id)}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                </Space>
              }
            >
              <p>{note.description}</p>
              {note.isSticky && <Tag color="volcano">Sticky</Tag>}
            </NoteCard>
          ))}
        </CardWrapper>
      </div>
    </CustomLayout>
  );
};

export default Notes;
