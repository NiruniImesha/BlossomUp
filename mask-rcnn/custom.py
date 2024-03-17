import os
import sys
import json
import numpy as np
import skimage.draw
import cv2
from mrcnn.visualize import display_instances
import matplotlib.pyplot as plt
import imgaug

ROOT_DIR = "C:\\Users\\Akila Tharuka\\Desktop\\Final Project"

sys.path.append(ROOT_DIR)
from mrcnn.config import Config
from mrcnn import model as modellib, utils

COCO_WEIGHTS_PATH = os.path.join(ROOT_DIR, "mask_rcnn_coco.h5")
DEFAULT_LOGS_DIR = os.path.join(ROOT_DIR, "logs")

class CustomConfig(Config):
    NAME = "object"
    GPU_COUNT = 1
    IMAGES_PER_GPU = 1
    NUM_CLASSES = 1 + 2
    STEPS_PER_EPOCH = 5
    DETECTION_MIN_CONFIDENCE = 0.9
    LEARNING_RATE = 0.001

class CustomDataset(utils.Dataset):
    def load_custom(self, dataset_dir, subset):
        self.add_class("object", 1, "healthy")
        self.add_class("object", 2, "diseased")
        assert subset in ["train", "val"]
        dataset_dir = os.path.join(dataset_dir, subset)
        annotations1 = json.load(open(os.path.join(dataset_dir, "train.json")))
        annotations = [a for a in annotations1.values() if a['regions']]
        for a in annotations:
            polygons = [r['shape_attributes'] for r in a['regions']] 
            objects = [s['region_attributes']['names'] for s in a['regions']]
            name_dict = {"healthy": 1, "diseased": 2}
            num_ids = [name_dict[a] for a in objects]
            image_path = os.path.join(dataset_dir, a['filename'])
            image = skimage.io.imread(image_path)
            height, width = image.shape[:2]
            self.add_image(
                "object",
                image_id=a['filename'],
                path=image_path,
                width=width, height=height,
                polygons=polygons,
                num_ids=num_ids
                )

    def load_mask(self, image_id):
        image_info = self.image_info[image_id]
        if image_info["source"] != "object":
            return super(self.__class__, self).load_mask(image_id)
        info = self.image_info[image_id]
        if info["source"] != "object":
            return super(self.__class__, self).load_mask(image_id)
        num_ids = info['num_ids']
        mask = np.zeros([info["height"], info["width"], len(info["polygons"])], dtype=np.uint8)
        for i, p in enumerate(info["polygons"]):
            rr, cc = skimage.draw.polygon(p['all_points_y'], p['all_points_x'])
            rr = np.clip(rr, 0, info["height"] - 1)
            cc = np.clip(cc, 0, info["width"] - 1)
            mask[rr, cc, i] = 1
        num_ids = np.array(num_ids, dtype=np.int32)
        return mask, num_ids

def train(model):
    dataset_train = CustomDataset()
    dataset_train.load_custom("C:\\Users\\Akila Tharuka\\Desktop\\Final Project\\dataset", "train")
    dataset_train.prepare()

    dataset_val = CustomDataset()
    dataset_val.load_custom("C:\\Users\\Akila Tharuka\\Desktop\\Final Project\\dataset", "val")
    dataset_val.prepare()

    model.train(dataset_train, dataset_val,
                learning_rate=config.LEARNING_RATE,
                epochs=10,
                layers='heads',
                augmentation=imgaug.augmenters.Sequential([
                    imgaug.augmenters.Fliplr(1),
                    imgaug.augmenters.Flipud(1),
                    imgaug.augmenters.Affine(rotate=(-45, 45)),
                    imgaug.augmenters.Affine(rotate=(-90, 90)),
                    imgaug.augmenters.Affine(scale=(0.5, 1.5)),
                    imgaug.augmenters.Crop(px=(0, 10)),
                    imgaug.augmenters.Grayscale(alpha=(0.0, 1.0)),
                    imgaug.augmenters.AddToHueAndSaturation((-20, 20)),
                    imgaug.augmenters.Add((-10, 10), per_channel=0.5),
                    imgaug.augmenters.Invert(0.05, per_channel=True),
                    imgaug.augmenters.Sharpen(alpha=(0, 1.0), lightness=(0.75, 1.5)),
                ]))

config = CustomConfig()
model = modellib.MaskRCNN(mode="training", config=config, model_dir=DEFAULT_LOGS_DIR)

weights_path = COCO_WEIGHTS_PATH
if not os.path.exists(weights_path):
    utils.download_trained_weights(weights_path)

model.load_weights(weights_path, by_name=True, exclude=[
            "mrcnn_class_logits", "mrcnn_bbox_fc",
            "mrcnn_bbox", "mrcnn_mask"])

train(model)
