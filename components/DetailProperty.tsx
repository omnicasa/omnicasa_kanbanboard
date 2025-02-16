"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import {
  ArrowDownToLine,
  Bath,
  BedDouble,
  CarFront,
  Eye,
  Map,
} from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import DetailStatus from "./DetailStatus";
import {
  useFetchSourceContact,
  useFetchSites,
  useFetchManagers,
} from "@/hooks/useFetchData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const pipe_status = [
  {
    value: "New",
    label: "New",
  },
  {
    value: "Contacted but No Communication",
    label: "Contacted but No Communication",
  },
  {
    value: "Call 1",
    label: "Call 1",
  },
  {
    value: "Call 2",
    label: "Call 2",
  },
  {
    value: "Appointment Set",
    label: "Appointment Set",
  },
  {
    value: "Appointment Done",
    label: "Appointment Done",
  },
  {
    value: "Follow Up 1 Month",
    label: "Follow Up 1 Month",
  },
  {
    value: "Follow Up 2 Months",
    label: "Follow Up 2 Months",
  },
  {
    value: "Follow Up 3 Months",
    label: "Follow Up 3 Months",
  },
  {
    value: "Follow Up 6 Months",
    label: "Follow Up 6 Months",
  },
];

const pipeline = [
  {
    value: "Cold Owner",
    label: "Cold Owner",
  },
  {
    value: "Cold Adoption",
    label: "Cold Adoption",
  },
  {
    value: "Warm Bought",
    label: "Warm Bought",
  },
  {
    value: "Warm Leads",
    label: "Warm Leads",
  },
];

interface DocumentTypeInfo {
  Id: number;
  NameNL: string;
  NameFR: string;
  NameEN: string;
  NameDE: string;
}

interface PublishOnInternetInfo {
  Id: number;
  NameNL: string;
  NameFR: string;
  NameEN: string;
  NameDE: string;
}

interface Document {
  Comments: string;
  CreatedDate: string;
  DocumentTypeId: number;
  DocumentTypeInfo: DocumentTypeInfo;
  FilePath: string;
  Filename: string;
  GroupId: number;
  IconURL: string;
  Id: number;
  IsConvertToPDF: boolean;
  IsExternalDocument: boolean;
  IsFolder: boolean;
  IsIncludeInMail: boolean;
  IsMissingOnCloud: boolean;
  ItemState: number;
  ModifiedDate: string;
  PropertyId: number;
  PublishOnInternetId: number;
  PublishOnInternetInfo: PublishOnInternetInfo;
  URL: string;
}

interface Picture {
  DescriptionOfCA: string;
  DescriptionOfDE: string;
  DescriptionOfEN: string;
  DescriptionOfFR: string;
  DescriptionOfNL: string;
  DescriptionOfSP: string;
  HeightOfImage: number;
  Id: number;
  IsExternalImage: boolean;
  IsMissingOnCloud: boolean;
  ItemState: number;
  OriginalPublishUrl: string;
  OriginalUrl: string;
  PictureNumber: number;
  PictureRoomIds: number[];
  PictureTypeIds: number[];
  PropertyId: number;
  PublishOnInternet: boolean;
  SmallPublishUrl: string;
  SmallUrl: string;
  WidthOfImage: number;
  XLargeUrl: string;
}

interface ProspectionProps {
  PropertyId: number;
  Reduction: number;
}

interface DetailPropertyProps {
  data: {
    Pictures: Picture[];
    PurposeId: number;
    Reference: string;
    Address: string;
    HouseNumber: string;
    CityName: string;
    NumberOfBedRoom: number;
    NumberOfBathRoom: number;
    NumberOfGarage: number;
    GroundArea: number;
    CityPostcode: number;
    EPCELevel: number;
    Prospection: ProspectionProps;
    SiteId: number;
    StartCommercialisation: string;
    Record: string;
    ManagerId: number;
    Comment: string;
    Documents: Document[];
  };
}

interface SourceContact {
  Id: number;
  NameNL: string;
}

interface Site {
  Id: number;
  NameNL: string;
}

interface Manager {
  Id: number;
  Name: string;
  ShortName: string;
  Email: string;
  SiteName: string;
}

const DetailProperty: React.FC<DetailPropertyProps> = ({ data }) => {
  const {
    Pictures,
    PurposeId,
    Reference,
    Address,
    HouseNumber,
    CityName,
    NumberOfBedRoom,
    NumberOfBathRoom,
    NumberOfGarage,
    GroundArea,
    CityPostcode,
    EPCELevel,
    Prospection,
    SiteId,
    StartCommercialisation,
    Record,
    ManagerId,
    Comment,
    Documents,
  } = data || {};

  const [isClient, setIsClient] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const itemsToShow = showAll ? Documents.length : 3;

  const images = Pictures
    ? Pictures.map((picture) => picture.OriginalPublishUrl)
    : [];

  const { data: sourceContacts } = useFetchSourceContact();
  const propertyId = Prospection ? Prospection.PropertyId : null;
  const sourceContact = sourceContacts?.SourceContact?.find(
    (contact: SourceContact) => contact.Id === propertyId
  );
  const propertyNameNL = sourceContact ? sourceContact.NameNL : "";

  const { data: sites } = useFetchSites();
  const site = sites?.Site?.find((site: Site) => site.Id === SiteId);
  const siteNameNL = site ? site.NameNL : "";

  const { data: managers } = useFetchManagers();
  const manager = managers?.Manager?.find(
    (manager: Manager) => manager.Id === ManagerId
  );
  const managerName = manager ? manager.Name : "";

  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  const getRegionByPostCode = (postCode: number) => {
    if (postCode >= 1000 && postCode <= 1299) {
      return "Brussels";
    } else if (postCode >= 1300 && postCode <= 1499) {
      return "Wallonia";
    } else if (postCode >= 1500 && postCode <= 3999) {
      return "Flanders";
    } else if (postCode >= 4000 && postCode <= 7999) {
      return "Wallonia";
    } else if (postCode >= 8000 && postCode <= 9999) {
      return "Flanders";
    } else {
      return "None";
    }
  };

  const getBrusselsEPCLabelURL = (epcLevel: number): string => {
    if (epcLevel <= -1) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1000.png";
    } else if (epcLevel >= 0 && epcLevel <= 15) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1001.png";
    } else if (epcLevel >= 16 && epcLevel <= 30) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1002.png";
    } else if (epcLevel >= 31 && epcLevel <= 45) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1003.png";
    } else if (epcLevel >= 46 && epcLevel <= 62) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1004.png";
    } else if (epcLevel >= 63 && epcLevel <= 78) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1005.png";
    } else if (epcLevel >= 79 && epcLevel <= 95) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1006.png";
    } else if (epcLevel >= 96 && epcLevel <= 113) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1007.png";
    } else if (epcLevel >= 114 && epcLevel <= 132) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1008.png";
    } else if (epcLevel >= 133 && epcLevel <= 150) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1009.png";
    } else if (epcLevel >= 151 && epcLevel <= 170) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1010.png";
    } else if (epcLevel >= 171 && epcLevel <= 190) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1011.png";
    } else if (epcLevel >= 191 && epcLevel <= 210) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1012.png";
    } else if (epcLevel >= 211 && epcLevel <= 232) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1013.png";
    } else if (epcLevel >= 233 && epcLevel <= 253) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1014.png";
    } else if (epcLevel >= 254 && epcLevel <= 275) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1015.png";
    } else if (epcLevel >= 276 && epcLevel <= 345) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1017.png";
    } else {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1019.png";
    }
  };

  const getWalloniaEPCLabelURL = (epcLevel: number): string => {
    if (epcLevel <= 0) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_1.png";
    } else if (epcLevel >= 1 && epcLevel <= 45) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_2.png";
    } else if (epcLevel >= 46 && epcLevel <= 85) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_3.png";
    } else if (epcLevel >= 86 && epcLevel <= 170) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_4.png";
    } else if (epcLevel >= 171 && epcLevel <= 255) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_5.png";
    } else if (epcLevel >= 256 && epcLevel <= 340) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_6.png";
    } else if (epcLevel >= 341 && epcLevel <= 425) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_7.png";
    } else if (epcLevel >= 426 && epcLevel <= 510) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_8.png";
    } else {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_9.png";
    }
  };

  const getFlandersEPCLabelURL = (epcLevel: number): string => {
    if (epcLevel <= 0) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_10001.png";
    } else if (epcLevel >= 1 && epcLevel <= 100) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_10002.png";
    } else if (epcLevel >= 101 && epcLevel <= 200) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_10003.png";
    } else if (epcLevel >= 201 && epcLevel <= 300) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_10004.png";
    } else if (epcLevel >= 301 && epcLevel <= 400) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_10005.png";
    } else if (epcLevel >= 401 && epcLevel <= 500) {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_10006.png";
    } else {
      return "https://epclabel.omnicasa.com/images/EPClabel/peb_10007.png";
    }
  };

  const calculateEPCLabel = (
    cityPostCode: number,
    epcLevel: number
  ): string => {
    const region = getRegionByPostCode(cityPostCode);
    if (region === "Brussels") {
      return getBrusselsEPCLabelURL(epcLevel);
    } else if (region === "Wallonia") {
      return getWalloniaEPCLabelURL(epcLevel);
    } else if (region === "Flanders") {
      return getFlandersEPCLabelURL(epcLevel);
    } else {
      return ""; // default URL
    }
  };

  const defineBadgeName = (purposeId: number) => {
    switch (purposeId) {
      case 0:
        return "For Sale";
      case 1:
        return "For Rent";
      case 2:
        return "For Takeover";
      default:
        return "";
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  const handleDownload = (item: Document) => {
    console.log("==>", item);
    const link = document.createElement("a");
    link.href = item.FilePath;
    link.download = item.Filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (item: Document) => {
    console.log("===>", item);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    carouselApi?.scrollTo(index);
  };

  useEffect(() => {
    if (carouselApi) {
      const onSelect = () => {
        setCurrentSlide(carouselApi.selectedScrollSnap());
      };
      carouselApi.on("select", onSelect);
      return () => {
        carouselApi.off("select", onSelect);
      };
    }
  }, [carouselApi]);

  return (
    <div className="flex flex-col gap-5 col-span-3">
      <div className="flex flex-col items-start self-stretch w-min-[324px] w-full bg-white border rounded-lg shadow-md">
        <div className="relative w-full">
          {images.length === 0 ? (
            <div className="w-min-[324px] h-min-[200px] w-full h-full">
              <Image
                src="/images/empty.png"
                alt="Image"
                width={324}
                height={200}
                className="w-full h-full rounded-t-sm object-cover"
              />
            </div>
          ) : (
            images.length > 0 && (
              <Carousel setApi={setCarouselApi} opts={{ loop: true }}>
                <CarouselContent>
                  {images.map((src, index) => (
                    <CarouselItem key={index}>
                      <div className="w-min-[324px] h-min-[200px] w-full h-full">
                        <Card className="h-full rounded-md flex items-center justify-center">
                          <CardContent className="flex items-center justify-center p-0 flex-1">
                            {isClient && (
                              <Image
                                src={src}
                                width={324}
                                height={200}
                                alt={`Image ${index}`}
                                className="w-full h-full object-cover rounded-md"
                              />
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center absolute bottom-2 w-full">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full mx-1 bg-primary-foreground ${
                        currentSlide === index ? "" : "opacity-60"
                      }`}
                      onClick={() => handleDotClick(index)}
                    />
                  ))}
                </div>
              </Carousel>
            )
          )}

          <Badge
            variant="outline"
            className="absolute w-auto min-h-[25px] min-w-[71px] px-2.5 py-1 left-3 top-3 rounded-md border border-transparent text-primary-foreground font-xs bg-button-primary shadow-md"
          >
            {defineBadgeName(PurposeId)}
          </Badge>
        </div>
        <div className="flex flex-col p-5 gap-5 w-full">
          <div className="flex flex-col items-start gap-1.5">
            <h1 className="text-card-foreground font-sans text-base font-semibold leading-6 capitalize">
              {Reference}
            </h1>
            <div className="flex items-end justify-start space-x-2">
              <p className="text-muted-foreground font-sans text-sm font-normal leading-5 mt-1.5">
                {`${Address}${
                  HouseNumber ? ", " + HouseNumber : ""
                }, ${CityName}`}
              </p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Image
                      src="/images/navigation-filled.svg"
                      alt="navigation-filled"
                      width={20}
                      height={20}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="end">
                    <p>View on Map</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex items-center justify-start space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1">
                    <BedDouble className="h-5 w-5 text-muted-foreground" />
                    <label className="text-primary text-center font-sans text-sm font-normal leading-5">
                      {NumberOfBedRoom}
                    </label>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                  <p>Bedrooms</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1">
                    <Bath className="h-5 w-5 text-muted-foreground" />
                    <label className="text-primary text-center font-sans text-sm font-normal leading-5">
                      {NumberOfBathRoom}
                    </label>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                  <p>Parking Int</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1">
                    <CarFront className="h-5 w-5 text-muted-foreground" />
                    <label className="text-primary text-center font-sans text-sm font-normal leading-5">
                      {NumberOfGarage}
                    </label>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                  <p>Total area</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1">
                    <Map className="h-5 w-5 text-muted-foreground" />
                    <label className="text-primary text-center font-sans text-sm font-normal leading-5">
                      {GroundArea} m²
                    </label>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                  <p>Bathrooms</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Separator className="border" />
          <div className="flex flex-col items-start">
            <h1 className="text-card-foreground font-sans text-base font-semibold leading-6">
              Property Details
            </h1>
            <div className="flex flex-col items-start mt-4 gap-3 w-full">
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  EPC
                </h2>
                <div className="flex items-center flex-1 relative">
                  {calculateEPCLabel(CityPostcode, EPCELevel) && (
                    <Image
                      src={calculateEPCLabel(CityPostcode, EPCELevel)}
                      alt="epc"
                      width={61}
                      height={20}
                      className="absolute right-0"
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  Lead Source
                </h2>
                <h3 className="text-primary text-right font-sans text-sm font-normal leading-5 flex-1">
                  {propertyNameNL}
                </h3>
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  Listing agent
                </h2>
                <h3 className="text-primary text-right font-sans text-sm font-normal leading-5 flex-1">
                  Greenfield Realty
                </h3>
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  Site
                </h2>
                <h3 className="text-primary text-right font-sans text-sm font-normal leading-5 flex-1">
                  {siteNameNL}
                </h3>
              </div>
              {StartCommercialisation && (
                <div className="flex items-center justify-between gap-2 w-full">
                  <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                    Days on Market
                  </h2>
                  <h3 className="text-primary text-right font-sans text-sm font-normal leading-5 flex-1">
                    {StartCommercialisation}
                  </h3>
                </div>
              )}
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  Pipeline
                </h2>
                <DetailStatus statuss={pipeline} title="pipeline" />
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  Pipe status
                </h2>
                <DetailStatus statuss={pipe_status} title="status" />
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  Record
                </h2>
                <h3 className="text-primary text-right font-sans text-sm font-normal leading-5 flex-1">
                  {Record}
                </h3>
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  Manager
                </h2>
                <h3 className="text-primary text-right font-sans text-sm font-normal leading-5 flex-1">
                  {managerName}
                </h3>
              </div>
            </div>
            {isShowMore && (
              <>
                <Separator className="border w-full my-4" />
                <div className="flex flex-col items-start w-full gap-3">
                  <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                    Notes
                  </h2>
                  <h3 className="text-primary font-sans text-sm font-normal leading-5 flex-1">
                    {Comment}
                  </h3>
                </div>
              </>
            )}
          </div>
          <Button
            variant="outline"
            className="flex h-9 px-4 py-2 justify-center items-center gap-2 self-stretch rounded-md border bg-white shadow-sm"
            onClick={handleShowMore}
          >
            {isShowMore ? "Show less" : "Show more"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-start self-stretch w-min-[324px] w-full bg-white border rounded-lg shadow-md p-5 gap-5">
        <h1 className="text-card-foreground font-sans text-base font-semibold leading-6 capitalize">
          PDF Attachments
        </h1>
        {Documents && Documents.length > 0 && (
          <>
            <div className="flex flex-col items-start mt-4 gap-3 w-full">
              {Documents.slice(0, itemsToShow).map(
                (document: Document, index) => (
                  <div
                    key={index}
                    className="relative flex items-start justify-between p-2 gap-2.5 w-full group"
                  >
                    <Image
                      src="/images/pdf.svg"
                      alt={`pdf-${index}`}
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col items-start gap-1 flex-1">
                      <h2 className="overflow-hidden text-primary text-ellipsis font-sans text-sm font-normal leading-5 flex-1">
                        {document.Comments}
                      </h2>
                      <h3 className="text-muted-foreground font-sans text-xs font-normal leading-none flex-1">
                        Portal: Immoweb
                      </h3>
                      <h3 className="text-muted-foreground font-sans text-xs font-normal leading-none flex-1">
                        Date:{" "}
                        {new Date(document.CreatedDate).toLocaleDateString(
                          "en-CA"
                        )}
                      </h3>
                    </div>
                    <div className="absolute right-2 top-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowDownToLine
                        onClick={() => handleDownload(document)}
                        className="h-5 w-5 text-muted-foreground cursor-pointer"
                      />
                      <Eye
                        onClick={() => handleView(document)}
                        className="h-5 w-5 text-muted-foreground cursor-pointer"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
            <Button
              variant="outline"
              className="flex h-9 px-4 py-2 justify-center items-center gap-2 self-stretch rounded-md border bg-white shadow-sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show less" : "Show more"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailProperty;
