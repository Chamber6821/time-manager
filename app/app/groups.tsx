import React, { useState } from 'react';
import { FlatList, Modal, Pressable, View, StyleSheet } from 'react-native';
import { useGroups } from '@/hooks/useGroups';
import { Column } from '@/components/Column';
import { H } from '@/components/H';
import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { MaterialIcons } from '@expo/vector-icons';
import { P } from '@/components/P';
import ColorPicker, { Preview, Swatches } from 'reanimated-color-picker';
import { Row } from '@/components/Row';

const randomComponent = () => Math.floor(Math.random() * 0xff).toString(16)

const ManageGroups = () => {
  const { groups, create, update, delete: deleteGroup } = useGroups();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<{ id?: number; name?: string; color?: string }>({});
  const [name, setName] = useState('');
  const [color, setColor] = useState('#' + randomComponent() + randomComponent() + randomComponent());

  const openModal = (group?: { id: number; name: string; color: string }) => {
    if (group) {
      setSelectedGroup(group);
      setName(group.name);
      setColor(group.color);
    } else {
      setSelectedGroup({});
      setName('');
      setColor('#ffeb3b');
    }
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (selectedGroup.id) {
      await update(selectedGroup.id, { name, color });
    } else {
      await create({ name, color });
    }
    setModalVisible(false);
  };

  const handleDelete = async (id: number) => {
    await deleteGroup(id);
  };

  return (
    <Column style={[styles.container, { gap: 16, height: '100%', justifyContent: 'flex-start' }]}>
      <Row style={{ width: '100%', height: 'auto', justifyContent: 'space-between' }}>
        <H>Управление группами</H>
        <Button style={{ width: 'auto' }} onPress={() => openModal()}>
          <MaterialIcons name="add" size={24} color="white" />
        </Button>
      </Row>
      <FlatList
        data={groups}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <Row style={{ width: '100%', height: 'auto', gap: 8, marginBottom: 16, justifyContent: 'space-between' }}>
            <P style={{ color: item.color }}>{item.name}</P>
            <View style={styles.buttonContainer}>
              <Button style={{ width: 'auto' }} onPress={() => openModal(item)}>
                <MaterialIcons name="edit" size={24} color="white" />
              </Button>
              <Button style={{ width: 'auto' }} onPress={() => handleDelete(item.id)}>
                <MaterialIcons name="delete" size={24} color="white" />
              </Button>
            </View>
          </Row>
        )}
      />
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable>
            <Column style={styles.modalContainer}>
              <Input
                value={name}
                onChange={e => setName(e.nativeEvent.text)}
                placeholder="Название группы"
              />
              <ColorPicker
                value={color}
                onComplete={x => setColor(x.hex)}
              >
                <Preview hideInitialColor style={{ marginBottom: 8 }} />
                <Swatches />
              </ColorPicker>
              <Row style={{ height: 'auto', width: '100%', gap: 8 }}>
                <Button style={{ flex: 1 }} onPress={handleSave}>
                  <MaterialIcons name="save" size={24} color="white" />
                </Button>
                <Button style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
                  <MaterialIcons name="cancel" size={24} color="white" />
                </Button>
              </Row>
            </Column>
          </Pressable>
        </Pressable>
      </Modal>
    </Column >
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  groupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  groupName: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(50, 50, 50, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    gap: 8,
  },
});

export default ManageGroups;
