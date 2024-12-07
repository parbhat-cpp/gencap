import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { Trash } from "@phosphor-icons/react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaFileUpload } from 'react-icons/fa'
import { RiAiGenerate2 } from "react-icons/ri";
import { IoIosCopy } from "react-icons/io";

import PageWrapper from '../../components/PageWrapper';
import { Button } from "../../components/ui/button";
import { ApiResponse } from "../../lib/ApiResponse";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui/select";
import { deleteImage, uploadImage } from "../../api/image.api";
import { generateCaptions } from "../../api/ai.api";
import LoaderDialog from "../../components/LoaderDialog";

const Homepage = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const captionOneInput = useRef<HTMLInputElement>(null);
  const captionTwoInput = useRef<HTMLInputElement>(null);
  const captionThreeInput = useRef<HTMLInputElement>(null);

  const [uploadedImage, setUploadedImage] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [objectKey, setObjectKey] = useState<string>("");
  const [captionLength, setCaptionLength] = useState<string>("");
  const [userPrompt, setUserPrompt] = useState<string>("");

  const [isLoading, setIsLoading] = useState<Record<string, any>>({
    loading: false,
    loaderText: "",
  });

  const [captions, setCaptions] = useState<Record<string, string>>();

  useEffect(() => {
    if (!uploadedImage) {
      setImagePreview(undefined);
      return;
    }

    const imageUrl = URL.createObjectURL(uploadedImage);

    setImagePreview(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [uploadedImage]);

  const handleFileAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files![0];

    if (imageFile.size > 1500000) {
      toast.error("Please select an image with size less than or equal to 1.5MB");
      return;
    }

    setUploadedImage(imageFile);
  }

  const handleRemoveImage = () => {
    if (fileInput.current) {
      fileInput.current.files = null;
      setUploadedImage(undefined);
      setImagePreview(undefined);
    }
  }

  const handleUploadImage = async () => {
    if (!uploadedImage) {
      toast.error("Please select an image");
      return;
    }

    const formdata = new FormData();
    formdata.append("image", uploadedImage);

    setIsLoading({ loading: true, loaderText: "Uploading Image..." });

    const imageUploadResponse: ApiResponse = await uploadImage(formdata);

    if (imageUploadResponse.status_code === 201) {
      setObjectKey(imageUploadResponse.data.key);
      toast.success("Image uploaded successfully");
    } else {
      toast.error("Something went wrong while uploading image. Please try again");
      setIsLoading({ loading: false, loaderText: "" });
      return;
    }

    setIsLoading({ loading: false, loaderText: "" });
  }

  const handleGenerateCaptions = async () => {
    try {
      setIsLoading({ loading: true, loaderText: "Generating Captions for You" });

      const generateCaptionsResponse = await generateCaptions(objectKey, captionLength, userPrompt);

      const captionJsonString = generateCaptionsResponse.data.choices[0].message.content as string;
      const captionsJson = JSON.parse(captionJsonString.substring(captionJsonString.indexOf("{"), captionJsonString.indexOf("}") + 1));

      console.log(captionJsonString);

      console.log(captionsJson);

      setCaptions(captionsJson);
      setIsLoading({ loading: false, loaderText: "" });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Received Invalid Response. Please re-try.");
      setIsLoading({ loading: false, loaderText: "" });
    }
  }

  const handleDeleteImage = async () => {
    setIsLoading({ loading: true, loaderText: "Deleting Image" });

    const deleteImageResponse = await deleteImage(objectKey);

    setIsLoading({ loading: false, loaderText: "" });

    if (deleteImageResponse.status_code === 200) {
      toast.success("Image deleted successfully");
      handleRemoveImage();
      setCaptions(undefined);
    } else {
      toast.error("Failed to delete image");
    }
  }

  const handleCopyCaption = (captionIndex: number) => {
    let captionValue = "";

    if (captionIndex < 1 && captionIndex > 3) {
      toast.error("Wrong index provided");
      return;
    }

    if (captionIndex === 1 && captionOneInput.current) {
      captionValue = captionOneInput.current.value;
    } else if (captionIndex === 2 && captionTwoInput.current) {
      captionValue = captionTwoInput.current.value;
    } else if (captionIndex === 3 && captionThreeInput.current) {
      captionValue = captionThreeInput.current.value;
    }

    if (captionValue) {
      navigator.clipboard.writeText(captionValue);
      toast.success("Caption copied");
    }
  }

  return (
    <PageWrapper>
      <div className='py-10 text-center flex justify-center text-textColor'>
        <div className='grid gap-16 md:max-w-[60vw] max-w-[80vw]'>
          <div className="grid gap-5">
            <h1 className='text-4xl'>
              <span className='font-dgGhayatyRegular'>
                GenCap
              </span>
              &nbsp;- Generate Social Media Captions with the Power of AI
            </h1>
            <p className='text-xl'>
              GenCap helps you make creative captions just by uploading the image and Llama vision AI will analyse and generate captions for you.
            </p>
          </div>

          <div className="grid gap-2">
            <label htmlFor='upload-image' className='flex justify-center items-center w-full h-64 border-2 rounded-md'>
              {!uploadedImage ?
                <>
                  <div className='flex gap-2 items-center text-2xl overflow-hidden'>
                    <FaFileUpload />
                    <h2>Upload an image</h2>
                  </div>
                </>
                :
                <img src={imagePreview} className="p-3 h-full w-full object-contain" aria-label="Uploaded Image" />
              }
            </label>
            <input ref={fileInput} onChange={handleFileAdd} type='file' id='upload-image' accept='image/*' hidden />
            {uploadedImage &&
              <div className="grid gap-2">
                <Select onValueChange={(value) => setCaptionLength(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Caption Length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Caption Length</SelectLabel>
                      <SelectItem value="short length">Short (Default)</SelectItem>
                      <SelectItem value="medium length">Medium</SelectItem>
                      <SelectItem value="long length">Long</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input placeholder="Provide additional information" value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} />
                <div className="flex sm:flex-row flex-col gap-2">
                  <Button className="flex-1" onClick={handleUploadImage}>
                    <IoCloudUploadOutline />
                    Upload Image
                  </Button>
                  <Button className="flex-1" onClick={handleGenerateCaptions}>
                    <RiAiGenerate2 />
                    Generate Captions
                  </Button>
                  <Button className="flex-1" variant={"destructive"} onClick={handleRemoveImage}>
                    <Trash size={32} />
                    Remove Image
                  </Button>
                </div>
              </div>
            }
          </div>

          <div className="grid gap-3">
            <h3 className="text-3xl">AI Generated Captions</h3>
            <div className="grid gap-2">
              <div className="flex gap-2">
                <Input ref={captionOneInput} value={captions?.caption1 || captions?.Caption1} placeholder="Caption 1" />
                <Button variant={"outline"} onClick={() => handleCopyCaption(1)} aria-label="Copy Caption 1">
                  <IoIosCopy />
                </Button>
              </div>
              <div className="flex gap-2">
                <Input ref={captionTwoInput} value={captions?.caption2 || captions?.Caption2} placeholder="Caption 2" />
                <Button variant={"outline"} onClick={() => handleCopyCaption(2)} aria-label="Copy Caption 2">
                  <IoIosCopy />
                </Button>
              </div>
              <div className="flex gap-2">
                <Input ref={captionThreeInput} value={captions?.caption3 || captions?.Caption3} placeholder="Caption 3" />
                <Button variant={"outline"} onClick={() => handleCopyCaption(3)} aria-label="Copy Caption 3">
                  <IoIosCopy />
                </Button>
              </div>
            </div>
            {captions && <>
              <Button variant={"destructive"} onClick={handleDeleteImage}>
                <Trash size={32} />
                Delete Image
              </Button>
              <p className="text-sm">Image will be automatically deleted in 24 hours. But, you can delete it right now by clicking the delete button</p></>}
          </div>
        </div>
      </div>
      <LoaderDialog open={isLoading.loading} title={isLoading.loaderText} />
    </PageWrapper>
  )
}

export default Homepage
