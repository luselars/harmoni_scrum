DROP TABLE IF EXISTS kommentar;
DROP TABLE IF EXISTS artikkel;
DROP TABLE IF EXISTS kategori;


CREATE TABLE artikkel (
  artikkelId int(11) NOT NULL,
  overskrift text NOT NULL,
  innhold text NOT NULL,
  fultInnhold text NOT NULL,
  innleggelseTid timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  bilde text NOT NULL,
  bildeAlt text NOT NULL,
  kategoriId int(11) DEFAULT NULL,
  viktighet tinyint(1) NOT NULL DEFAULT '1',
  likes int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE kategori (
  kategoriId int(11) NOT NULL,
  navn varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE kommentar (
  kommentarId int(11) NOT NULL,
  artikkelId int(11) NOT NULL,
  navn varchar(200) NOT NULL DEFAULT '"Anonym"',
  innhold text NOT NULL,
  likes int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE artikkel
  ADD PRIMARY KEY (artikkelId);

ALTER TABLE kategori
  ADD PRIMARY KEY (kategoriId);

ALTER TABLE kommentar
  ADD PRIMARY KEY (kommentarId),
  ADD KEY arikkelId (artikkelId);

ALTER TABLE artikkel
  MODIFY artikkelId int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE kommentar
  MODIFY kommentarId int(11) NOT NULL AUTO_INCREMENT;