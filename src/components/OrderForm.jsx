import React, { useState } from "react";
import { useForm } from "react-hook-form";

const OrderForm = ({index}) => {
  const {
    register, setValue,
    handleSubmit, reset,
    formState: { errors },
  } = useForm({mode: "onTouched"});

  const [talents, setTalents] = useState([{ id: 1 }]);

  const [jobId, setJobId] = useState('');

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  const addTalent = () => {
    setTalents([...talents, { id: talents.length + 1 }]);
  };

  const deleteTalent = (id) => {
    setTalents(talents.filter((talent) => talent.id !== id));
  };

  const jobOptions = [
    { title: 'One', id: 'JOB_001' },
    { title: 'Two', id: 'JOB_002' },
    { title: 'Three', id: 'JOB_003' },
  ];

  const handleJobTitleChange = (e) => {
    const selectedJob = jobOptions.find(job => job.title === e.target.value);
    const id = selectedJob ? selectedJob.id : '';
    setJobId(id);
    setValue(`jobid-${index}`, id);
  };

  return (
    <div className="order-form py-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container-fluid">
          <div className="row g-4 mb-3 px-3">
            <div className="col-lg-3 col-md-6">
              <label className="form-label">Client Name</label>
              <span className="text-danger">*</span>
              <select className="form-select" required {...register("clientname")}>
                <option value="">Group PO</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="col-lg-3 col-md-6">
              <label className="form-label">Purchase Order Type</label>
              <span className="text-danger">*</span>
              <select className="form-select" required {...register("purchaseordertyp")}>
                <option value="">Group PO</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-lg-3 col-md-6">
              <label className="form-label">Purchase Order No.</label>
              <span className="text-danger">*</span>
              <input
                type="number"
                className="form-control"
                placeholder="PO Number"
                {...register("purchaseorderno", { min: 6, max: 10 })}
                required
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <label id="date" className="form-label">
                Received On.
              </label>
              <span className="text-danger">*</span>
              <input type="date" className="form-control" {...register("receivedon", { required: true })}/>
            </div>
          </div>

          <div className="row g-4 mb-3 px-3">
            <div className="col-12 col-md-6 col-lg-3">
              <label className="form-label">Received From</label>
              <span className="text-danger">*</span>
              <input
                type="text"
                className="form-control"
                placeholder="sagar"
                id="receivedfrom"
                {...register("receivedfrom", { required: "Received From is required" })}
              />
              {errors.receivedfrom && (
                <div className="text-danger">{errors.receivedfrom.message}</div>
              )}
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <label className="form-label">sdsd</label>
              <span className="text-danger"></span>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Received From Email ID"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                required
              />
              {errors.email && <div className="text-danger">{errors.email.message}</div>}

            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="row">
                <div className="col-6">
                  <label className="form-label">PO Start Date</label>
                  <span className="text-danger">*</span>
                  <input
                    type="date"
                    className="form-control"
                    {...register("postrartdate", { required: true })}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">PO End Date</label>
                  <span className="text-danger">*</span>
                  <input
                    type="date"
                    className="form-control"
                    {...register("poenddate", { required: true })}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="row">
                <div className="col-6">
                  <label className="form-label">Budget</label>
                  <span className="text-danger">*</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Budget"
                    {...register("purchaseorderno")}
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">Currency</label>
                  <span className="text-danger">*</span>
                  <select
                    className="form-select"
                    required
                    {...register("Currency")}
                  >
                    <option value="">USD-Doller</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-3 bg-light px-3">
            <div className="talent d-flex justify-content-between align-items-center">
              <p className="fw-bold mb-0">Talent Detail.</p>
              <button
                type="button"
                className="btn btn-outline-dark rounded-pill"
                onClick={addTalent}
              >
                {" "}
                + Add Another
              </button>
            </div>
          </div>
        </div>

        <div className="container-fluid bg-light talent-list pb-3">
          {talents.map((talent, index) => (
            <div key={talent.id}>
              <div className="row mb-3 px-3">
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <label className="form-label">Job Title/REQ Name</label>
                  <span className="text-danger">*</span>
                  <select
                    className="form-select"
                    required
                    {...register(`jobtitle-${index}`)}
                    onChange={handleJobTitleChange}
                  >
                    <option value="">Application Development</option>
                    {jobOptions.map((job, idx) => (
                      <option key={idx} value={job.title}>{job.title}</option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <label className="form-label">Job ID/REQ ID</label>
                  <span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="OWNAI_456"
                    value={jobId}
                    {...register(`jobid-${index}`)}
                    disabled
                  />
                </div>
                <div className="col-12 col-md-12 gap-3 col-lg-6 d-flex justify-content-end align-items-center">
                  <span><i className="fa-regular fa-trash-can" onClick={() => deleteTalent(talent.id)}></i></span>
                  <span><i className="fa-solid fa-minus mx-3" onClick={() => deleteTalent(talent.id)}></i></span>
                </div>
              </div>
              <hr />

              <div className="row mb-3 px-3">
                <div className="form-check ms-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`gridCheck-${index}`}
                  />
                  <label className="form-check-label fw-bold">
                    Monika Goyel Test
                  </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <label className="form-label">Contract Duration</label>
                  <input
                    type="month"
                    className="form-control"
                    placeholder="Contract Duration"
                    required
                  />
                </div>
                <div className="col-12 col-lg-9">
                  <div className="row g-3">
                    <div className="col-6 col-md-4 col-lg-2">
                      <label className="form-label">Bill Rates</label>
                      <input type="time" className="form-control" required />
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                      <label className="form-label">Currency</label>
                      <select className="form-select" required {...register(`currencyone-${index}`)}>
                        <option value="">USD-Doller</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                      <label className="form-label">Standard Time BR</label>
                      <input type="time" className="form-control" required />
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                      <label className="form-label">Currency</label>
                      <select className="form-select" required {...register(`currencytwo-${index}`)}>
                        <option value="">USD-Doller</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                      <label className="form-label">Over Time BR</label>
                      <input type="time" className="form-control" required />
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                      <label className="form-label">Currency</label>
                      <select
                        className="form-select"
                        required
                        {...register(`currencythree-${index}`)}
                      >
                        <option value="">USD-Doller</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-3 px-3">
                <div className="form-check ms-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`gridCheck-${index}`}
                  />
                  <label className="form-check-label fw-bold">Shailli Khatri</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <label className="form-label">Contract Duration</label>
                  <input
                    type="month"
                    className="form-control"
                    placeholder="Contract Duration"
                    required
                  />
                </div>
                <div className="col-12 col-lg-9">
                  <div className="row g-3">
                    <div className="col-6 col-md-4 col-lg-2">
                      <label className="form-label">Bill Rates</label>
                      <input
                        type="time"
                        className="form-control"
                        placeholder="Bill Rates"
                        required
                      />
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                      <label className="form-label">Currency</label>
                      <select
                        className="form-select"
                        required
                        {...register(`currencyfour-${index}`)}
                      >
                        <option value="">USD-Doller</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                      <label className="form-label">Standard Time BR</label>
                      <input
                        type="time"
                        className="form-control"
                        placeholder="Std. Time BR"
                        required
                      />
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                      <label className="form-label">Currency</label>
                      <select className="form-select" required {...register(`currencyfive-${index}`)}>
                        <option value="">USD-Doller</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                      <label className="form-label">Over Time BR</label>
                      <input
                        type="time"
                        className="form-control"
                        placeholder="Over Time BR"
                        required
                      />
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                      <label className="form-label">Currency</label>
                      <select
                        className="form-select"
                        required
                        {...register(`currencysix-${index}`)}
                      >
                        <option value="">USD-Doller</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="navbar fixed-bottom px-3 gap-3 bg-body justify-content-md-end">
          <button
            className="btn btn-outline-dark rounded-pill"
            onClick={() => reset()}
          >
            Reset
          </button>
          <button type="submit" className="btn btn-secondary rounded-pill">
            save
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;