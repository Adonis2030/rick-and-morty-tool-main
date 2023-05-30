import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_CHARACTERS, GET_LOCATIONS } from "./graphqlQueries";
import { Card, Button } from "react-bootstrap";
import Scene from "./Scene";
import AddSceneModal from "./AddSceneModal";
import EditSceneModal from "./EditSceneModal";
import "./style.css";

interface IScene {
  id: string;
  characters: string[];
  location: string;
  description: string;
}

const SceneList: React.FC = () => {
  const { data: charactersData, loading: charactersLoading } = useQuery(GET_CHARACTERS);
  const { data: locationsData, loading: locationsLoading } = useQuery(GET_LOCATIONS);
  const [scenes, setScenes] = useState<IScene[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedScene, setSelectedScene] = useState<IScene | null>(null);

  const handleAddScene = (newScene: IScene) => {
    setScenes([...scenes, newScene]);
    setShowAddModal(false);
  };

  const handleRemoveScene = (id: string) => {
    const updatedScenes = scenes.filter((scene) => scene.id !== id);
    setScenes(updatedScenes);
  };

  const handleEditScene = (scene: IScene) => {
    setSelectedScene(scene);
    setShowEditModal(true);
  };

  const handleSaveScene = (updatedScene: IScene) => {
    const updatedScenes = scenes.map((scene) => (scene.id === updatedScene.id ? updatedScene : scene));
    setScenes(updatedScenes);
    setShowEditModal(false);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  if (charactersLoading || locationsLoading) {
    return <div>Loading...</div>;
  }

  const characters = charactersData.characters.results.map((character: { id: string; name: string }) => character.name);
  const locations = locationsData.locations.results.map((location: { id: string; name: string }) => location.name);

  return (
    <div>
      <h2 className="text-center">Scene List</h2>
      <div className="card-list">
        {scenes.map((scene) => (
          <Card key={scene.id} className="scene-card">
            <Card.Body>
              <Scene
                scene={scene}
                characters={characters}
                locations={locations}
                onRemoveScene={handleRemoveScene}
                onEditScene={handleEditScene}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
      <Button className="btn-add-scene" variant="primary" onClick={() => setShowAddModal(true)}>
        Add Scene
      </Button>
      <AddSceneModal
        show={showAddModal}
        characters={characters}
        locations={locations}
        onAddScene={handleAddScene}
        onHide={handleCloseModal}
      />
      {selectedScene && (
        <EditSceneModal
          show={showEditModal}
          scene={selectedScene}
          characters={characters}
          locations={locations}
          onSave={handleSaveScene}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default SceneList;
