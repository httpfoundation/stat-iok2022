import { useEffect, useState, useRef } from "react";
import Section from "../../components/Section/Section";
import Text from "../../components/Text/Text";
import Title from "../../components/Title/Title";
import Clock from "../../icons/Clock";
import Coffee from "../../icons/Coffee";
import "./Schedule.scss";
import { useAllElements } from '../../tools/datoCmsTools'
import { StructuredText  } from "react-datocms"
import { useStaticElement } from '../../tools/datoCmsTools'

/* Egy napirendi pont komponense */
const PreseterImages = (props) => {
    <div className="images">
        {props.presenters?.map((presenter) => (
            <div
                key={presenter.id}
                className="image"
                style={{
                    backgroundImage:
                        "url('" + presenter.image.url + "')",
                }}
            ></div>
        ))}
    </div>
}


const ScheduleItem = (props) => {
    const double = props.presenters?.length > 1;
    return (
        <div
            className={`shcedule-item ${props.open ? "open" : ""} ${
                double ? "double-presenter" : ""
            }`}
            onClick={props.onClick}
        >
            <div className="images">
                {props.presenters?.map((presenter, index) => (
                    <div
                        key={presenter.id}
                        className="image"
                        style={{
                            backgroundImage: "url('" + presenter.image.url + "')",
                            transform: `translateY(${index * -7}px)`,
                        }}
                    ></div>
                ))}
            </div>
            <div className="content">
                <div className="time">
                    <Clock />
                    {props.time}
                </div>
                <div className="title">{props.title}</div>
                {props.presenters?.map((presenter) => (
                    <div
                        key={presenter.id}
                        className="presenter"
                    >{`${presenter.name}, ${presenter.title}, ${presenter.company}`}</div>
                ))}
                <div className="description">
                    {props.description}
                </div>
            </div>
        </div>
    );
};

/* Separator komponens */
const Separator = (props) => {
    return (
        <div className="separator">
            <div className="separator-text">{props.children}</div>

            <div className="line" />
        </div>
    );
};

/* Plenáris szekció napirendje */

const PlenarySessionSchedule = (props) => {
    const { schedule, openedScheduleItem, setOpenedScheduleItem } = props;

    return schedule.map((presentation, index) => {
        if (presentation.speaker[0])
            return (
                <ScheduleItem
                    title={presentation.title}
                    time={presentation.start.substring(11, 16)}
                    presenters={presentation.speaker}
                    description={presentation.description}
                    key={index}
                    open={openedScheduleItem === presentation.id}
                    onClick={() =>
                        setOpenedScheduleItem(
                            openedScheduleItem === presentation.id
                                ? null
                                : presentation.id
                        )
                    }
                />
            );
        else
            return (
                <Separator key={index}>
                    <Coffee />
                    {presentation.title}
                </Separator>
            );
    });
};

const BreakoutSessionsSchedule = (props) => {
    const { breakoutSessionStages, openedScheduleItem, setOpenedScheduleItem } = props;
	const [selectedStageIndex, setSelectedStageIndex] = useState(0);
    const tabButtonRefs = useRef([])
	const sessionRefs = useRef([])
	const selectorRef = useRef()
	
	let resizeObserver;

    const selectTab = (index) => {
		setSelectedStageIndex(index)
        const target = tabButtonRefs.current[index];
		if (!(target)) return null
        const offset =
            window.scrollX +
            target.getBoundingClientRect().left -
            target.parentElement.getBoundingClientRect().left - 2;
        const width = target.offsetWidth;

        const selector = selectorRef.current;

        selector.style.left = offset + "px";
        selector.style.width = width + "px";

        const targetIndex = Number(target.dataset.index);
        const allSessions = [...document.getElementsByClassName("sessions")];
        allSessions.map((sessions, index) => {
            
			sessions.className = sessions.className
                .replace(" right", "")
                .replace(" left", "")
                .replace(" selected", "");

            if (index === targetIndex) {
                sessions.className += " selected";
                document.getElementsByClassName(
                    "sessions-container"
                )[0].style.height =
                    sessions.getBoundingClientRect().height + "px";
                if (resizeObserver) resizeObserver.disconnect();
                resizeObserver = new ResizeObserver((entries) => {
                    document.getElementsByClassName(
                        "sessions-container"
                    )[0].style.height =
                        sessions.getBoundingClientRect().height + "px";
                });
                resizeObserver.observe(sessions);
            }
            if (index < targetIndex)
                sessions.className =
                    sessions.className.replace(" right", "") + " left";
            if (index > targetIndex)
                sessions.className =
                    sessions.className.replace(" left", "") + " right";

            return null;
        });
    };

    useEffect(() => {
        selectTab(0)
    }, [])

    return (
        <div className="tabs-container">
            <h3>Szekció előadások</h3>
            <div className="tabs">
                <div ref={selectorRef} className="selector"></div>
                {breakoutSessionStages?.map((stage, index) => {
                    return (
                        <div
                            className={(index===selectedStageIndex) ? "tab-button selected" : "tab-button"}
                            onClick={() => selectTab(index)}
                            data-index={index}
                            key={index}
							ref={el => tabButtonRefs.current[index]=el}
                        >
                            "{["A", "B", "C", "D"][index]}" szekció
                        </div>
                    );
                })}
            </div>
            <div className="sessions-container">
                {breakoutSessionStages?.map((stage, sIndex) => {
                    return (
                        <div className="sessions" key={sIndex} >
                            <h4>"{stage.name}" szekció {stage.online && <b>(Online)</b>}</h4>
                            {stage?.schedule.map((presentation, index) => {
                                if (presentation.speaker.length)
                                    return (
                                        <ScheduleItem
                                            title={presentation.title}
                                            time={presentation.start.substring(
                                                11,
                                                16
                                            )}
                                            description={presentation.description}
                                            presenters={presentation.speaker}
                                            key={index}
                                            open={
                                                openedScheduleItem ===
                                                presentation.id
                                            }
                                            onClick={() => {
                                                setOpenedScheduleItem(
                                                    openedScheduleItem ===
                                                        presentation.id
                                                        ? null
                                                        : presentation.id
                                                );
                                            }}
                                        />
                                    );
                                else
                                    return (
                                        <Separator key={index}>
                                            <Coffee />
                                            {presentation.title}
                                        </Separator>
                                    );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* Teljes napirend komponense */
const Schedule = (props) => {
    const [allStages] = useAllElements("stages")
    const [openedScheduleItem, setOpenedScheduleItem] = useState(null);
    const [scheduleText] = useStaticElement("talk") 
    
    return (
        <Section container placeholder id="program">
            <Title>
                Konferencia <span className="highlight">PROGRAM</span>
            </Title>
            <Text subtitle>
                <StructuredText data={scheduleText}/>
            </Text>
            {allStages && (
				<>
					<PlenarySessionSchedule
						schedule={allStages[0].schedule}
						openedScheduleItem={openedScheduleItem}
						setOpenedScheduleItem={setOpenedScheduleItem}
					/>
				
					<BreakoutSessionsSchedule
						breakoutSessionStages={allStages?.slice(1)}
						openedScheduleItem={openedScheduleItem}
						setOpenedScheduleItem={setOpenedScheduleItem}
					/>
				</>
			)}
        </Section>
    );
};

export default Schedule;
